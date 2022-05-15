/*
 * @Author: jweboy
 * @Date: 2020-02-20 21:41:05
 * @LastEditors: jweboy
 * @LastEditTime: 2020-03-11 23:11:31
 */
import Router from 'koa-router';

const router = new Router();

const mockRoutes = router.get('/', (ctx) => {
  ctx.body = 'API接口';
});

export default mockRoutes;
