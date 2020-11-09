import { Context } from 'koa';
import { NOT_FOUND_CODE, NOT_FOUND_TEXT, SUCCEED_CODE, SUCCEED_TEXT } from '../contants/locale';

const requestIntercept = () => {
  return async (ctx: Context, next) => {
    const { status, body } = ctx.response;

    // 接口地址 404
    if (status === NOT_FOUND_CODE) {
      ctx.body = {
        code: NOT_FOUND_CODE,
        msg: NOT_FOUND_TEXT,
        data: null,
      };
    }

    // 正常返回
    ctx.body = {
      code: SUCCEED_CODE,
      msg: SUCCEED_TEXT,
      data: body,
    };

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
