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

export const createDirectory = async (ctx: Context) => {
  const { body } = ctx.request;
  const repository = getRepository(AssetsDirectory);
  const directory = repository.create(body);
  const data = await repository.save(directory);

  ctx.body = {
    code: 0,
    data,
    msg: STATUS_TEXT[StatusCode.Success].text,
  };
};

export const getDirectories = async (ctx: Context) => {
  const { query } = ctx.request;

  const repository = getRepository(AssetsDirectory);
  const [items, total] = await repository.createQueryBuilder('assets_directory').getManyAndCount();

  ctx.body = {
    code: 0,
    data: { items, total },
    msg: STATUS_TEXT[StatusCode.Success].text,
  };
  // console.log(data);
};
