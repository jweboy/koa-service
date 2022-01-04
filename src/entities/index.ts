/*
 * @Author: jweboy
 * @Date: 2020-01-22 16:29:31
 * @LastEditors: jweboy
 * @LastEditTime: 2022-01-04 14:49:41
 */
import Post from './post';
import AssetsDirectory from './assets/directories';
import Coupon from './coupon';
import User from './user';
import Commodity from './commodity';
import Database from '../utils/database';

export const createDatebase = () => {
  const db = new Database({
    entities: [User, Commodity],
    // entities: [Post, AssetsDirectory, Coupon],
  });

  return db.connect();
};
