import { Context } from 'koa';
import { SUCCEED_CODE } from '../../contants/locale';
import qiniu from '../../utils/upload';

/*
 * @Author: jweboy
 * @Date: 2022-04-24 14:18:49
 * @LastEditors: jweboy
 * @LastEditTime: 2022-04-24 22:21:52
 */
export const getFileInfo = async (ctx: Context) => {
  const { bucket, fileName } = ctx.query;
  // @ts-ignore
  const data = await qiniu.getFileInfo<Qiniu.File>(bucket as string, fileName as string);
  const url = qiniu.getPublicUrl(fileName as string);
  const isSuccess = data.code === SUCCEED_CODE;

  if (isSuccess) {
    data.data.url = url;
  }
  ctx.body = data;
};
