import { sign } from 'jsonwebtoken';
import { v4 } from 'uuid';
import { SIGN_SECRET } from '../contants/public';

/*
 * @Author: jweboy
 * @Date: 2021-12-12 16:16:05
 * @LastEditors: jweboy
 * @LastEditTime: 2021-12-12 16:23:30
 */
export const getToken = (options?: any) => {
  const payload = options || v4();
  const token = sign(payload, SIGN_SECRET);

  return token;
};
