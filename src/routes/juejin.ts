/*
 * @Author: jweboy
 * @Date: 2020-02-20 21:41:05
 * @LastEditors: jweboy
 * @LastEditTime: 2020-03-11 23:11:31
 */
import Router from 'koa-router';
import { getCheckinList, getCheckinStatus, postCheckin } from '../controller/juejin';

const router = new Router();

const juejinRoutes = router
  .prefix('/juejin')
  .get('/checkin/status', getCheckinStatus)
  .post('/checkin', postCheckin)
  .get('/checkin/list', getCheckinList);

export default juejinRoutes;
