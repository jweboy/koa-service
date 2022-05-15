/*
 * @Author: jweboy
 * @Date: 2020-02-20 21:40:56
 * @LastEditors: jweboy
 * @LastEditTime: 2021-12-12 16:08:27
 */

import { combineRouters } from '../utils/router';
import testRouter from './test';
import postRouter from './post';
import directoryRouter from './directories';
import FileRouter from './file';
import couponRouter from './coupon';
import publicRouter from './public';
import qiniuRouter from './qiniu';
import commodityRouter from './commodity';
import corpWechatRoutes from './corp_wechat';
import yuqueRouter from './yuque';
import juejinRoutes from './juejin';
import mockRoutes from './mock';

export default combineRouters([
  directoryRouter,
  postRouter,
  testRouter,
  FileRouter,
  couponRouter,
  publicRouter,
  qiniuRouter,
  commodityRouter,
  corpWechatRoutes,
  yuqueRouter,
  juejinRoutes,
  mockRoutes,
]);
