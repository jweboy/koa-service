/*
 * @Author: jweboy
 * @Date: 2020-02-20 21:41:05
 * @LastEditors: jweboy
 * @LastEditTime: 2021-07-04 16:06:54
 */
import Router from 'koa-router';
import { getToken } from '../controller/public';

const router = new Router();

const publicRouter = router.prefix('/public').get('/token', getToken);

export default publicRouter;
