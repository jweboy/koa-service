/*
 * @Author: jweboy
 * @Date: 2020-02-20 21:40:56
 * @LastEditors: jweboy
 * @LastEditTime: 2021-07-04 16:31:09
 */

import Router from 'koa-router';
import { combineRouters } from '../utils/router';
import testRouter from './test';
import postRouter from './post';
import directoryRouter from './assets/directories';
import FileRouter from './file';
import couponRouter from './coupon';
import publicRouter from './public';

const router = new Router();

const indexRouter = router.get('/', (ctx) => {
  ctx.body = 'API接口';
});

export default combineRouters([
  directoryRouter,
  indexRouter,
  postRouter,
  testRouter,
  FileRouter,
  couponRouter,
  publicRouter,
]);
