/*
 * @Author: jweboy
 * @Date: 2020-11-15 10:57:15
 * @LastEditors: jweboy
 * @LastEditTime: 2021-07-04 16:37:51
 */
import { Context } from 'koa';
import { NOT_FOUND_CODE, NOT_FOUND_TEXT, SUCCEED_CODE, SUCCEED_TEXT } from '../contants/locale';

const requestIntercept = () => {
  return async (ctx: Context, next) => {
    const { status, body } = ctx.response;
    const { url } = ctx.request;

    // console.log('response=>', ctx.response, status);

    // 接口地址 404
    // if (status === NOT_FOUND_CODE) {
    //   ctx.body = {
    //     code: NOT_FOUND_CODE,
    //     msg: NOT_FOUND_TEXT,
    //     data: null,
    //   };
    //   // return;
    // }

    // 业务逻辑错误，如同名记录等
    if (body && body.error) {
      const { error, ...restProps } = body;
      ctx.body = restProps;
    } else {
      // 正常返回
      ctx.body = {
        code: SUCCEED_CODE,
        msg: SUCCEED_TEXT,
        data: body || null,
      };
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
