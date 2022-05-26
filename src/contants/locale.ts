/*
 * @Author: jweboy
 * @Date: 2020-11-21 14:30:25
 * @LastEditors: jweboy
 * @LastEditTime: 2020-11-21 15:47:16
 */
export const NOT_FOUND_CODE = 404;
export const NOT_FOUND_TEXT = '接口未定义';
export const SUCCEED_CODE = 0;
export const SUCCEED_TEXT = '请求成功';

export const DB_ERROR_DATA_DUPLICATION = 10000;
export const INVALIDA_PASSWORD = 10001;
export const INVALIDA_USER = 10002;

export enum ErrorCode {
  ServerError = 10000,
  InvalidPassword,
  InvalidUser,
  NotSigninForJuejin,
  SignedIn,
  NoCookie,
  CookieExpired,
  AlreadyExists,
}

export const ErrorMessage = {
  [ErrorCode.AlreadyExists]: {
    error: '数据已存在',
  },
};
