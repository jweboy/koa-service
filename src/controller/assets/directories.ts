/*
 * @Author: jweboy
 * @Date: 2020-11-07 21:54:43
 * @LastEditors: jweboy
 * @LastEditTime: 2020-11-09 00:01:43
 */
import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { StatusCode, STATUS_TEXT } from '../../contants/response';
import AssetsDirectory from '../../entities/assets/directories';

export const createDirectory = async (ctx: Context, next) => {
  const { body } = ctx.request;
  const repository = getRepository(AssetsDirectory);
  const directory = repository.create(body);
  const data = await repository.save(directory);

  ctx.body = data;
  next();
};

export const getDirectories = async (ctx: Context, next) => {
  const { query } = ctx.request;

  const repository = getRepository(AssetsDirectory);
  const [items, total] = await repository.createQueryBuilder('assets_directory').getManyAndCount();

  ctx.body = { items, total };
  next();
};
