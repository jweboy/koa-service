import QueryString from 'qs';
import { URL } from 'url';

export function serializateQuery(data: Record<string, any>, addQueryPrefix: boolean = true) {
  return QueryString.stringify(data, { addQueryPrefix });
}

export function serializateUrlWithQuery(url: string, data: Record<string, any>) {
  const query = serializateQuery(data);
  return url + query;
}

export const getUrlObj = <T>(url: string, params?: T) => {
  const urlObj = new URL(url);
  urlObj.search = serializateQuery(params);
  return urlObj;
};
