import { Context } from 'koa';
import { get } from '../../../utils/request';
import { getAccessToken } from './access_token';

export const getUserDetail = async (ctx: Context, next) => {
  const { userId } = ctx.query;

  const token = await getAccessToken();
  const data = await get({
    url: '/user/get',
    params: { userid: userId, access_token: token },
  });
  ctx.body = data;
  next();
};
