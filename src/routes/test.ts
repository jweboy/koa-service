/*
 * @Author: jweboy
 * @Date: 2020-02-20 21:41:05
 * @LastEditors: jweboy
 * @LastEditTime: 2020-11-07 17:20:37
 */
import Router from 'koa-router';

const router = new Router();

const testRouter = router.get('/test', (ctx, next) => {
  ctx.body = 'test';
  next();
});

export default testRouter;
