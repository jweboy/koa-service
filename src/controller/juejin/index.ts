import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { request } from 'undici';
import Signin from '../../entities/juejin/signin';
import { ErrorCode } from '../../contants/locale';
import { JUEJIN_REQUEST_URL } from '../../contants/url';

const headers = {
  'content-type': 'application/json; charset=utf-8',
  'user-agent':
    'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
  'sec-ch-ua': '"Chromium";v="88", "Google Chrome";v="88", ";Not A Brand";v="99"',
  'sec-ch-ua-mobile': '?0',
  referer: 'https://juejin.cn/',
  accept: '*/*',
  cookie:
    '_ga=GA1.2.813806625.1641349924; MONITOR_WEB_ID=19ce9558-017a-46cd-90aa-de924ba5aca5; __tea_cookie_tokens_2608=%257B%2522user_unique_id%2522%253A%25227049544189831349801%2522%252C%2522web_id%2522%253A%25227049544189831349801%2522%252C%2522timestamp%2522%253A1642755319215%257D; _tea_utm_cache_2608={%22utm_source%22:%22gold_browser_extension%22}; _gid=GA1.2.1167387113.1652065841; passport_csrf_token=2e2d2c4b15eb8eb447096492700ef863; passport_csrf_token_default=2e2d2c4b15eb8eb447096492700ef863; n_mh=X2NfGPcpMWZWks1Leuvh2DkW7S_hfjv4ZqP64rBmMNo; sid_guard=c58fc2d9edb5b9fef6583829f909a8ed%7C1652066078%7C31536000%7CTue%2C+09-May-2023+03%3A14%3A38+GMT; uid_tt=06ba542ec51ffdfdabf7b6ba37ad9d86; uid_tt_ss=06ba542ec51ffdfdabf7b6ba37ad9d86; sid_tt=c58fc2d9edb5b9fef6583829f909a8ed; sessionid=c58fc2d9edb5b9fef6583829f909a8ed; sessionid_ss=c58fc2d9edb5b9fef6583829f909a8ed; sid_ucp_v1=1.0.0-KDc5NDhiMjRmNzJlOGUxZjkxOTZmYTI1ZTk4ZmVkMmM5Nzk3M2NkOGMKFgiN8rG-_fX9BBCejuKTBhiwFDgIQDgaAmxmIiBjNThmYzJkOWVkYjViOWZlZjY1ODM4MjlmOTA5YThlZA; ssid_ucp_v1=1.0.0-KDc5NDhiMjRmNzJlOGUxZjkxOTZmYTI1ZTk4ZmVkMmM5Nzk3M2NkOGMKFgiN8rG-_fX9BBCejuKTBhiwFDgIQDgaAmxmIiBjNThmYzJkOWVkYjViOWZlZjY1ODM4MjlmOTA5YThlZA',
};

enum SigninStatus {
  Not,
  Ok,
}

export const getCheckinStatus = async (ctx: Context, next) => {
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
    };
  } else {
    ctx.body = {
      error: '服务器错误',
      code: ErrorCode.ServerError,
    };
  }
  next();
};

export const postCheckin = async (ctx: Context, next) => {
  const result = await request(`${JUEJIN_REQUEST_URL}/check_in`, { headers, method: 'POST' }).then(({ body }) =>
    body.json()
  );

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
