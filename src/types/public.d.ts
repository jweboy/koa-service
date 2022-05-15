/*
 * @Author: jweboy
 * @Date: 2022-04-24 22:20:45
 * @LastEditors: jweboy
 * @LastEditTime: 2022-04-24 22:20:46
 */
declare namespace Public {
  interface Response<T> {
    code: number;
    msg: string;
    data?: T;
  }
}
