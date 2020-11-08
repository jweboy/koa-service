/*
 * @Author: jweboy
 * @Date: 2020-02-21 22:40:58
 * @LastEditors: jweboy
 * @LastEditTime: 2020-02-21 22:41:58
 */
export interface Response<T> {
  msg: string;
  code: number;
  data?: T;
}
