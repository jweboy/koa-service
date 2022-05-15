import { Context } from 'koa';
import { get } from '../../utils/request';

export const getDocs = async (ctx: Context, next) => {
  const data = await get({
    url: 'https://awrlhm.yuque.com/api/v2/repos/awrlhm/ge0tik/docs/mtn3h7',
    // @ts-ignore
    headers: { 'X-Auth-Token': 'FjCY71JDfSlQKTaioG9HCamm5I4LTRhSDJIqp08R', 'User-Agent': 'PostmanRuntime/7.29.0' },
  });
  console.log('data', data);
  ctx.body = data;
  next();
};
