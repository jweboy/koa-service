import { Context } from 'koa';
import { request } from 'undici';
import { CORP_ID, APPLICATION_SECRET, BASE_REQUEST_URL, CUSTOMER_API_SECRET } from '../../../contants/url';
import { URL } from 'url';
import { getUrlObj, serializateQuery } from '../../../utils/url';

export const getCustomerToken = async () => {
  const params = { corpid: CORP_ID, corpsecret: CUSTOMER_API_SECRET };
  const urlObj = getUrlObj(BASE_REQUEST_URL + '/gettoken', params);
  // @ts-ignore
  const { access_token } = await request(urlObj, { method: 'GET', params }).then(({ body }) => body.json());
  return access_token;
};
