import { BASE_REQUEST_URL } from '../contants/url';
import { request } from 'undici';
import { URL } from 'url';
import QueryString from 'qs';
import { serializateQuery } from './url';
import { getAccessToken } from '../controller/corp_wechat/identity/access_token';

// const { statusCode, headers, trailers, body } = data;

interface Options {
  url: string;
  params?: any;
}

// @ts-ignore
export const get = async ({ url: uri, params = {}, headers }: Options) => {
  const url = /http(s):\/\//.test(uri) ? uri : BASE_REQUEST_URL + uri;
  const urlObj = new URL(url);

  if (!params['access_token']) {
    params['access_token'] = await getAccessToken();
  }

  urlObj.search = serializateQuery(params);

  return request(urlObj, { method: 'GET', headers }).then(({ body, headers }) => {
    // console.log(await body.text());
    return body.json();
  });
};

export const requestHandler = async (method: 'GET' | 'POST' | 'DELETE', restOptions): Promise<any> => {
  const { url: uri, params = {}, data = {} } = restOptions;
  const url = BASE_REQUEST_URL + uri;
  const urlObj = new URL(url);

  if (!params['access_token']) {
    params['access_token'] = await getAccessToken();
  }

  urlObj.search = serializateQuery(params);

  return request(urlObj, { method, body: JSON.stringify(data) }).then(({ body, headers }) => body.json());
};

export const post = (options: Options) => requestHandler('POST', options);
