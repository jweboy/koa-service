/*
 * @Author: jweboy
 * @Date: 2020-03-14 13:43:08
 * @LastEditors: jweboy
 * @LastEditTime: 2020-03-22 22:15:58
 */
export interface FileModel {
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

export interface FileQueryModel {
  prefix?: string;
  size?: number;
}

export interface DeleteFileModel {
  names?: string[];
  prefix?: string;
}
