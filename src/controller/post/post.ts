/*
 * @Author: jweboy
 * @Date: 2020-02-20 23:01:27
 * @LastEditors: jweboy
 * @LastEditTime: 2020-03-15 00:07:10
 */
import { getManager, getRepository } from 'typeorm';
import { Context } from 'koa';
import { nextTick } from 'process';
import { ListModel } from '../../typings/list';
import Post from '../../entities/post';
import { Response } from '../../typings/http';
import { STATUS_TEXT, StatusCode } from '../../contants/response';

export async function findPosts(ctx: Context, next) {
  const repository = getRepository(Post);
  const [items, total] = await repository
    .createQueryBuilder('post')
    .orderBy('post.createDate', 'DESC')
    .getManyAndCount();

  ctx.body = { items, total };
  next();
}

export async function createPost(ctx: Context, next) {
  const { body } = ctx.request;

  const repository = getRepository(Post);
  const post = repository.create(body);
  const data = await repository.save(post);

  ctx.body = data;
  next();
}
