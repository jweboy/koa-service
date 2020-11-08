/*
 * @Author: jweboy
 * @Date: 2020-02-21 22:49:53
 * @LastEditors: jweboy
 * @LastEditTime: 2020-03-13 23:31:28
 */
export enum StatusCode {
  Success,
  Error,
}

export const STATUS_TEXT = {
  [StatusCode.Success]: {
    text: '请求成功',
  },
};
