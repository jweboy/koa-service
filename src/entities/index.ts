/*
 * @Author: jweboy
 * @Date: 2020-01-22 16:29:31
 * @LastEditors: jweboy
 * @LastEditTime: 2022-01-26 14:52:44
 */
import Post from './post';
import AssetsDirectory from './assets/directories';
import Coupon from './coupon';
import User from './user';
import Commodity from './commodity';
import Database from '../utils/database';
import { CouponBasicConfig } from './coupon/basic_config';
import Coupons from './coupon/coupons';
import Signin from './juejin/signin';
import Project from './project';

export const createDatebase = () => {
  const db = new Database({
    entities: [User, Commodity, CouponBasicConfig, Coupons, Signin, Project],
    // entities: [Post, AssetsDirectory],
  });

  // @ts-ignore
  global.db = db;

  return db.connect();
};
