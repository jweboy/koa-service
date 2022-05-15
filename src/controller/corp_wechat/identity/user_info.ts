import { Context } from 'koa';
import { get } from '../../../utils/request';
import { getAccessToken } from './access_token';

export const getUserInfo = async (ctx: Context, next) => {
  const { code } = ctx.query;

  const token = await getAccessToken();
  const data = await get({
    url: '/user/getuserinfo',
    params: {
      code,
      access_token: token,
    },
  });
  ctx.body = data;
  next();
};
