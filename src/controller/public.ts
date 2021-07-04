import { readFileSync } from 'fs';
import { sign } from 'jsonwebtoken';
import { v4 } from 'uuid';
import { getPrivateKey } from '../utils/encrypt';

/*
 * @Author: jweboy
 * @Date: 2021-07-04 15:57:40
 * @LastEditors: jweboy
 * @LastEditTime: 2021-07-04 16:30:13
 */
export const getToken = (ctx, next) => {
  const privateKey = getPrivateKey();
  const uuid = v4();
  const token = sign({ uuid }, privateKey);
  ctx.body = token;
  next();
};
