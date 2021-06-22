/*
 * @Author: jweboy
 * @Date: 2020-11-15 10:57:15
 * @LastEditors: jweboy
 * @LastEditTime: 2021-06-13 12:41:32
 */
import { Context } from 'koa';
import { NOT_FOUND_CODE, NOT_FOUND_TEXT, SUCCEED_CODE, SUCCEED_TEXT } from '../contants/locale';

const requestIntercept = () => {
  return async (ctx: Context, next) => {
    const { status, body } = ctx.response;

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
      ctx.status = err.statusCode || err.status || 500;
      ctx.body = {
        message: err.message,
      };
    }
  };
};

export default requestIntercept;
