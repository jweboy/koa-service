/*
 * @Author: jweboy
 * @Date: 2020-02-20 21:40:56
 * @LastEditors: jweboy
 * @LastEditTime: 2021-06-13 18:13:24
 */

import Router from 'koa-router';
import { combineRouters } from '../utils/router';
import testRouter from './test';
import postRouter from './post';
// import fileRouter from './assets/file';
import directoryRouter from './assets/directories';
import FileRouter from './file';
import couponRouter from './coupon';

const router = new Router();

const indexRouter = router.get('/', (ctx) => {
  ctx.body = 'mock接口平台';
});

export default combineRouters([directoryRouter, indexRouter, postRouter, testRouter, FileRouter, couponRouter]);
