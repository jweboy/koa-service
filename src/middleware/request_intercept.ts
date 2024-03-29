/*
 * @Author: jweboy
 * @Date: 2020-11-15 10:57:15
 * @LastEditors: jweboy
 * @LastEditTime: 2021-10-05 12:16:59
 */
import { Context } from 'koa';
import { NOT_FOUND_CODE, NOT_FOUND_TEXT, SUCCEED_CODE, SUCCEED_TEXT } from '../contants/locale';

const requestIntercept = () => {
  return async (ctx: Context, next) => {
    const { status, body } = ctx.response;
    // const { url } = ctx.request;
    console.log('body', body);

    // 业务逻辑错误，如同名记录等
    // @ts-ignore
    if (body && body.error) {
      // @ts-ignore
      const { error, code } = body;
      ctx.body = { code, msg: error, data: null };
    } else {
      // 正常返回
      ctx.body = { code: SUCCEED_CODE, msg: SUCCEED_TEXT, data: body || null };
    }

    try {
      await next();
    } catch (err) {
      if (err.status === 401) {
        ctx.status = 401;
        ctx.body = '当前接口授权失败，请传入正确的token后重试';
      }
      if (err.status === 500) {
        ctx.status = 500;
        ctx.body = '服务器错误，请稍后重试';
      }

      ctx.status = err.statusCode || err.status;
      ctx.body = {
        message: err.message,
      };
    }
  };
};

export default requestIntercept;
