/*
 * @Author: jweboy
 * @Date: 2021-06-13 18:22:17
 * @LastEditors: jweboy
 * @LastEditTime: 2021-06-24 00:48:15
 */
import { getManager, getRepository } from 'typeorm';
import { Context } from 'koa';
import Qiniu from '../utils/upload';
import { ListModel } from '../typings/list';
import Coupon from '../entities/coupon';
import { Response } from '../typings/http';
import { STATUS_TEXT, StatusCode } from '../contants/response';

const qiniu = new Qiniu();

export async function findCoupons(ctx: Context, next) {
  const { query } = ctx.request;
  const { order } = query;
  const repository = getRepository(Coupon);
  const orderField = (order || 'asc').toUpperCase();

  const [items, total] = await repository
    .createQueryBuilder('coupon')
    .orderBy('coupon.id', orderField)
    .getManyAndCount();

  ctx.body = { items, total };
  next();
}

export async function createCoupon(ctx: Context, next) {
  const { body } = ctx.request;
  // console.log('coupon=>', body);

  const repository = getRepository(Coupon);
  const coupon = repository.create(body);
  const data = await repository.save(coupon);

  ctx.body = data;
  next();
}

export const editCoupon = async (ctx: Context, next) => {
  const { body } = ctx.request;
  const repository = getRepository(Coupon);

  await repository
    .createQueryBuilder()
    .update(Coupon)
    .set(body)
    .where('id= :id', { id: body.id })
    .execute();

  ctx.body = {};
  next();
};

export const deleteCoupon = async (ctx: Context, next) => {
  const { body } = ctx.request;
  const repository = getRepository(Coupon);
  const tmpImage = body.image.split('/');
  const fileName = tmpImage[tmpImage.length - 1];
  const key = tmpImage[tmpImage.length - 2];

  await qiniu.deleteFile({ fileName, key });
  const data = await repository.findOne(body.id);

  await repository.remove(data);
  next();
};
