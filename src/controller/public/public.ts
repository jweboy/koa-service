import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { getToken } from '../../utils/public';
import User from '../../entities/user';

/*
 * @Author: jweboy
 * @Date: 2021-07-04 15:57:40
 * @LastEditors: jweboy
 * @LastEditTime: 2021-12-12 16:25:16
 */
export const getRefreshToken = (ctx, next) => {
  const token = getToken();
  ctx.body = token;
  next();
};
