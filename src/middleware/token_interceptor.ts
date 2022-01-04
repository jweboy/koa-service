import jwt from 'koa-jwt';
import { SIGN_SECRET } from '../contants/public';

/*
 * @Author: jweboy
 * @Date: 2021-07-04 16:00:15
 * @LastEditors: jweboy
 * @LastEditTime: 2021-12-12 16:40:49
 */
const tokenInterceptor = () => {
  return jwt({ secret: SIGN_SECRET }).unless({
    path: [/^\/api\/public/, /^\/api\/mock/, /^\/favicon.ico/],
  });
};

export default tokenInterceptor;
