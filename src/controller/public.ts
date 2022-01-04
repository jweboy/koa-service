import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { getToken } from '../utils/public';
import User from '../entities/user';

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

export const postUserLogin = async (ctx: Context, next) => {
  const { body } = ctx.request;
  const repository = getRepository(User);
  const user = await repository
    .createQueryBuilder('user')
    .where('user.email = :email', { email: body.email })
    .getOne();
  const { password, ...restProps } = user;
  const token = getToken();

  ctx.body = { ...restProps, token };
  next();
};
