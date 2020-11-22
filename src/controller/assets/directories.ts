/*
 * @Author: jweboy
 * @Date: 2020-11-07 21:54:43
 * @LastEditors: jweboy
 * @LastEditTime: 2020-11-21 16:13:11
 */
import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { DB_ERROR_DATA_DUPLICATION } from '../../contants/locale';
import AssetsDirectory from '../../entities/assets/directories';

export const createDirectory = async (ctx: Context, next) => {
  const { body } = ctx.request;
  const repository = getRepository(AssetsDirectory);
  const directory = repository.create(body);
  const current = await repository.findOne({ name: body.name });

  // 数据库中已存在同名数据
  if (current) {
    ctx.body = {
      msg: '目录已存在',
      code: DB_ERROR_DATA_DUPLICATION,
      error: true,
      data: null,
    };
  } else {
    const data = await repository.save(directory);
    ctx.body = data;
  }

  next();
};

export const deleteDirectory = async (ctx: Context, next) => {
  const { query } = ctx.request;
  const repository = getRepository(AssetsDirectory);
  const data = await repository.findOne(query.id);

  await repository.remove(data);
  next();
};

export const getDirectories = async (ctx: Context, next) => {
  const { query } = ctx.request;

  const repository = getRepository(AssetsDirectory);
  const [items, total] = await repository
    .createQueryBuilder('assets_directory')
    .orderBy('assets_directory.createAt', 'DESC')
    .getManyAndCount();

  ctx.body = { items, total };
  next();
};
