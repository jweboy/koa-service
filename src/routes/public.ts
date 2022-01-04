/*
 * @Author: jweboy
 * @Date: 2020-02-20 21:41:05
 * @LastEditors: jweboy
 * @LastEditTime: 2021-12-04 17:21:55
 */
import Router from 'koa-router';
import { getRefreshToken, postUserLogin } from '../controller/public';

const router = new Router();

const publicRouter = router
  .prefix('/public')
  .get('/token', getRefreshToken)
  .post('/login', postUserLogin);

export default publicRouter;
