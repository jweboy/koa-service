/*
 * @Author: jweboy
 * @Date: 2020-03-10 23:15:53
 * @LastEditors: jweboy
 * @LastEditTime: 2020-03-22 22:22:21
 */
import { Context } from 'koa';
import { StatusCode, STATUS_TEXT } from '../contants/response';
import { Qiniu } from '../utils/upload';
import { Response } from '../typings/http';
import { FileModel } from '../typings/file';

const qiniu = new Qiniu();

export async function uploadFile(ctx: Context) {
  const { body } = ctx.request;
  console.log('上传文件请求参数 ----->', body, ctx.file);

  try {
    const fileData = await qiniu.uploadFile(body.key, ctx.file);

    const resp: Response<FileModel> = {
      data: fileData,
      msg: STATUS_TEXT[StatusCode.Success].text,
      code: StatusCode.Success,
    };

    ctx.body = resp;
  } catch (err) {
    ctx.body = {
      code: err.statusCode,
      data: null,
      msg: err.error,
    };
  }
}

export async function deleteFile(ctx: Context) {
  const { body } = ctx.request;
  console.log('删除文件请求参数 ----->', body);

  try {
    const resp = await qiniu.deleteFile(body);

    ctx.body = {
      code: 0,
      data: resp,
      msg: STATUS_TEXT[StatusCode.Success].text,
    };
  } catch (err) {
    ctx.body = {
      code: err.statusCode,
      data: null,
      msg: err.error,
    };
  }
}

export async function getFiles(ctx: Context) {
  const { query } = ctx.request;

  try {
    const data = await qiniu.getFiles(query);
    // @ts-ignore
    const files = data.items.reduce((arr, file, index) => {
      arr.push({
        ...file,
        id: index + 1,
        name: file.key,
      });
      return arr;
    }, []);
    const resp = {
      data: { items: files },
      msg: STATUS_TEXT[StatusCode.Success].text,
      code: StatusCode.Success,
    };

    ctx.body = resp;
  } catch (err) {
    ctx.body = {
      code: err.statusCode,
      data: null,
      msg: err.error,
    };
  }
}

export async function deleteFiles(ctx: Context) {
  const { body } = ctx.request;
  console.log('批量删除文件请求参数 ----->', body);

  try {
    const resp = await qiniu.deleteFiles(body);

    ctx.body = {
      code: 0,
      data: resp,
      msg: STATUS_TEXT[StatusCode.Success].text,
    };
  } catch (err) {
    ctx.body = {
      code: err.statusCode,
      data: null,
      msg: err,
    };
  }
}
