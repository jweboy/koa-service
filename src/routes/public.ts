/*
 * @Author: jweboy
 * @Date: 2020-02-20 21:41:05
 * @LastEditors: jweboy
 * @LastEditTime: 2021-12-04 17:21:55
 */
import Router from 'koa-router';
import { postUserRegister, postUserLogin } from '../controller';
import { getRefreshToken } from '../controller/public/public';

const router = new Router();

const publicRouter = router
  .prefix('/public')
  .get('/token', getRefreshToken)
  .post('/login', postUserLogin)
  .post('/register', postUserRegister);

export default publicRouter;
