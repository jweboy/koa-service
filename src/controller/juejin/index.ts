import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { request } from 'undici';
import dayjs from 'dayjs';
import Signin from '../../entities/juejin/signin';
import { ErrorCode } from '../../contants/locale';
import { JUEJIN_REQUEST_URL } from '../../contants/url';

const baseHeaders = {
  'content-type': 'application/json; charset=utf-8',
  'user-agent':
    'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
  'sec-ch-ua': '"Chromium";v="88", "Google Chrome";v="88", ";Not A Brand";v="99"',
  'sec-ch-ua-mobile': '?0',
  referer: 'https://juejin.cn/',
  accept: '*/*',
};

enum SigninStatus {
  Not,
  Ok,
}

const today = dayjs();

const checkCookieIsExpired = async () => {
  // @ts-ignore
  const { expired, cookie } = await global.redis.HGETALL('juejin');
  const diffDays = dayjs(expired).diff(today, 'd');

  // 30 天有效期
  if (diffDays < 0) {
    return {
      error: 'cookie已过期，请重新获取cookie提交',
      code: ErrorCode.CookieExpired,
    };
  }

  return { cookie };
};

export const getCheckinStatus = async (ctx: Context, next) => {
  const { cookie, error, code } = await checkCookieIsExpired();
  if (error) {
    ctx.body = { error, code };
    next();
    return;
  }
  const headers = {
    ...baseHeaders,
    cookie,
  };

  // 查询今日是否已经签到
  const result = await request(`${JUEJIN_REQUEST_URL}/get_today_status`, {
    headers,
  }).then(({ body }) => body.json());

  if (result.err_no === 0) {
    const repository = getRepository(Signin);
    const { incr_point, sum_point } = await repository
      .createQueryBuilder()
      .orderBy('signin.update_time', 'DESC')
      .getOne();
    ctx.body = {
      status: result.data ? SigninStatus.Ok : SigninStatus.Not,
      incr_point,
      sum_point,
      cookie,
    };
  } else {
    ctx.body = {
      error: !cookie ? '未找到存储的cookie，请重新提交cookie' : '服务器错误',
      code: !cookie ? ErrorCode.NoCookie : ErrorCode.ServerError,
    };
  }
  next();
};

export const postCheckin = async (ctx: Context, next) => {
  const { body } = ctx.request;
  const { cookie, error, code } = await checkCookieIsExpired();

  // 检查cookie是否在有效期内
  if (error) {
    ctx.body = { error, code };
    next();
    return;
  }

  // 首次没有存入 cookie，就将 cookie 值存入到 redis 里
  if (cookie == null) {
    const laterDays = today.add(30, 'd');

    // @ts-ignore
    await global.redis.HSET('juejin', 'cookie', body.cookie);
    // @ts-ignore
    await global.redis.HSET('juejin', 'expired', laterDays.format('YYYY-MM-DD HH:mm:ss'));
  }

  // 组合请求 header
  const headers = { ...baseHeaders, cookie: body.cookie };

  // 打卡签到
  const result = await request(`${JUEJIN_REQUEST_URL}/check_in`, { headers, method: 'POST' }).then(({ body }) =>
    body.json()
  );

  // 打卡成功就将结果存入到数据库中
  if (result.err_no === 0) {
    const repository = getRepository(Signin);
    await repository
      .createQueryBuilder()
      .insert()
      .into(Signin)
      .values(result.data)
      .execute();
    ctx.body = result.data;
  } else {
    ctx.body = {
      error: result.err_msg,
      code: ErrorCode.SignedIn,
    };
  }
  next();
};

export const getCheckinList = async (ctx: Context, next) => {
  const repository = getRepository(Signin);

  const [list, total] = await repository
    .createQueryBuilder()
    .orderBy('signin.update_time', 'DESC')
    .getManyAndCount();
  ctx.body = { list, total };
  next();
};
