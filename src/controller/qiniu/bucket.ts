/*
 * @Author: jweboy
 * @Date: 2021-10-05 11:28:42
 * @LastEditors: jweboy
 * @LastEditTime: 2021-10-05 12:26:10
 */
import { Context } from 'koa';
import qiniu from '../../utils/upload';

export const getBuckets = async (ctx: Context, next) => {
  const data = await qiniu.listPrefix();
  console.log(333, data);
  ctx.body = data;
  next();
};
