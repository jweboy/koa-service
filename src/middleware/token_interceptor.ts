import jwt from 'koa-jwt';
import { getPrivateKey } from '../utils/encrypt';

/*
 * @Author: jweboy
 * @Date: 2021-07-04 16:00:15
 * @LastEditors: jweboy
 * @LastEditTime: 2021-07-04 16:38:24
 */
const tokenInterceptor = () => {
  const privateKey = getPrivateKey();

  return jwt({ secret: privateKey }).unless({ path: [/^\/api\/public/, /^\/favicon.ico/] });
};

export default tokenInterceptor;
