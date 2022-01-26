/*
 * @Author: jweboy
 * @Date: 2021-06-13 18:18:12
 * @LastEditors: jweboy
 * @LastEditTime: 2022-01-26 11:56:10
 */
import Router from 'koa-router';
import multer from '@koa/multer';
import { createCoupon, deleteCoupon, editCoupon, findCoupons, getCouponConfig } from '../controller/coupon';

const router = new Router();

const couponRouter = router
  .prefix('/public')
  .get('/coupons', findCoupons)
  .post('/coupon', createCoupon)
  .post('/coupon/edit', editCoupon)
  .post('/coupon/delete', deleteCoupon)
  .get('/coupon/config', getCouponConfig);

export default couponRouter;
