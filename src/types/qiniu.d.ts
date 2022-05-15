/*
 * @Author: jweboy
 * @Date: 2022-04-24 22:18:52
 * @LastEditors: jweboy
 * @LastEditTime: 2022-04-24 22:18:53
 */
declare namespace Qiniu {
  interface File {
    fileName?: string;
    key?: string;
    hash?: string;
    fsize?: number;
    mimeType?: string;
    putTime?: number;
    type?: number;
    status?: number;
    md5?: string;
    url?: string;
    id?: number;
  }
}
