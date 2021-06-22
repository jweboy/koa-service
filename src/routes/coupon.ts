/*
 * @Author: jweboy
 * @Date: 2021-06-13 18:18:12
 * @LastEditors: jweboy
 * @LastEditTime: 2021-06-13 23:58:59
 */
import Router from 'koa-router';
import multer from '@koa/multer';
import { createCoupon, deleteCoupon, editCoupon, findCoupons } from '../controller/coupon';

const router = new Router();

const couponRouter = router
  .get('/coupons', findCoupons)
  .post('/coupon', createCoupon)
  .post('/coupon/edit', editCoupon)
  .post('/coupon/delete', deleteCoupon);

export default couponRouter;
