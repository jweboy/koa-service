/*
 * @Author: jweboy
 * @Date: 2021-06-13 18:22:17
 * @LastEditors: jweboy
 * @LastEditTime: 2022-01-04 18:28:38
 */
import { getManager, getRepository } from 'typeorm';
import { Context } from 'koa';
import Commodity from '../../entities/commodity';

export async function findCommodity(ctx: Context, next) {
  const { query } = ctx.request;
  console.log(query);
  const { sortField = 'create_date', order = 'DESC' } = query;
  const repository = getRepository(Commodity);

  const [items, total] = await repository
    .createQueryBuilder('commodity')
    // @ts-ignore
    .orderBy(`commodity.${sortField}`, order.toUpperCase())
    .getManyAndCount();

  ctx.body = { items, total };
  next();
}

export async function createCommodity(ctx: Context, next) {
  const { body } = ctx.request;
  const repo = getRepository(Commodity);
  const commodity = await repo.findOne(body);

  if (commodity != null) {
    ctx.body = {
      code: 10011,
      data: null,
      msg: '数据已存在',
    };
  } else {
    const record = repo.create(body);
    const data = await repo.save(record);

    ctx.body = data;
  }

  next();
}

export const deleteCommodityRecord = async (ctx: Context, next) => {
  const repo = getRepository(Commodity);
  const { query } = ctx.request;

  await repo
    .createQueryBuilder()
    .delete()
    .from(Commodity)
    .where('id = :id', { id: query.id })
    .execute();

  ctx.body = {};
  next();
};

export const updateCommodity = async (ctx: Context, next) => {
  const repo = getRepository(Commodity);
  const { body } = ctx.request;
  const { id, ...restProps } = body;

  await repo
    .createQueryBuilder()
    .update(Commodity)
    .set(restProps)
    .where('id = :id', { id })
    .execute();

  ctx.body = {};
  next();
};
