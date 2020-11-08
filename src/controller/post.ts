/*
 * @Author: jweboy
 * @Date: 2020-02-20 23:01:27
 * @LastEditors: jweboy
 * @LastEditTime: 2020-03-15 00:07:10
 */
import { getManager, getRepository } from 'typeorm';
import { Context } from 'koa';
import { ListModel } from '../typings/list';
import Post from '../entities/post';
import { Response } from '../typings/http';
import { STATUS_TEXT, StatusCode } from '../contants/response';

export async function findPosts(ctx: Context) {
  const repository = getRepository(Post);
  const [items, total] = await repository
    .createQueryBuilder('post')
    .orderBy('post.createDate', 'DESC')
    .getManyAndCount();

  const resp: Response<ListModel<Post[]>> = {
    data: { items, total },
    msg: STATUS_TEXT[StatusCode.Success].text,
    code: StatusCode.Success,
  };

  ctx.body = resp;
}

export async function createPost(ctx: Context) {
  const { body } = ctx.request;

  const repository = getRepository(Post);
  const post = repository.create(body);
  const postData = await repository.save(post);

  const resp: Response<Post> = {
    // @ts-ignore
    data: postData,
    msg: STATUS_TEXT[StatusCode.Success].text,
    code: StatusCode.Success,
  };
  ctx.body = resp;
}
