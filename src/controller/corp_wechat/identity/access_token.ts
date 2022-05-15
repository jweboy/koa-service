import { Context } from 'koa';
import { request } from 'undici';
import { CORP_ID, APPLICATION_SECRET, BASE_REQUEST_URL } from '../../../contants/url';
import { URL } from 'url';
import { serializateQuery } from '../../../utils/url';

export const getAccessToken = async () => {
  const params = { corpid: CORP_ID, corpsecret: APPLICATION_SECRET };
  const urlObj = new URL(BASE_REQUEST_URL + '/gettoken');
  urlObj.search = serializateQuery(params);
  // @ts-ignore
  const { access_token } = await request(urlObj, { method: 'GET', params }).then(({ body }) => body.json());
  return access_token;
};
