import { Context } from 'koa';
import { get, post } from '../../../utils/request';
import { getCustomerToken } from '../identity/customer_token';

export const getCustomerGroupTags = async (ctx: Context, next) => {
  const token = await getCustomerToken();
  console.log('customer token', token);
  const data = await get({
    url: '/externalcontact/get_corp_tag_list',
    params: { access_token: token },
  });
  ctx.body = data;
  next();
};

export const postAddCorpTag = async (ctx: Context, next) => {
  const { body } = ctx.request;
  console.log(2, body);
  const token = await getCustomerToken();
  const data = await post({
    url: '/externalcontact/add_corp_tag',
    params: { access_token: token },
    // @ts-ignore
    data: body,
  });
  ctx.body = data;
  next();
};
