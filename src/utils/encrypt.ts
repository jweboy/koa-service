import { readFileSync } from 'fs';

/*
 * @Author: jweboy
 * @Date: 2021-07-04 16:28:59
 * @LastEditors: jweboy
 * @LastEditTime: 2021-07-04 16:29:32
 */
export const getPrivateKey = () => {
  const privateKey = readFileSync('id_rsa', { encoding: 'utf-8' });
  return privateKey;
};
