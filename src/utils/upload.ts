/*
 * @Author: jweboy
 * @Date: 2020-03-09 00:03:22
 * @LastEditors: jweboy
 * @LastEditTime: 2022-04-24 22:21:30
 */
import * as qiniuSDK from 'qiniu';
import { File } from '@koa/multer';
import { FileModel, FileQueryModel, DeleteFileModel } from '../typings/file';
import { SUCCEED_CODE } from '../contants/locale';

class Qiniu {
  secretKey: string;

  accessKey: string;

  bucket: string;

  baseUrl: string;

  listPrefixOptions: qiniuSDK.rs.ListPrefixOptions;

  constructor() {
    // AccessKey = KgNS98Sj66CuXFi64xNHs11vfrO8iXmX8Zcht-Id
    // SecretKey = gohLJusvDqZcwwYaL_DcF-KeTDX65zDdEzaEyayP
    this.accessKey = 'KgNS98Sj66CuXFi64xNHs11vfrO8iXmX8Zcht-Id';
    this.secretKey = 'gohLJusvDqZcwwYaL_DcF-KeTDX65zDdEzaEyayP';
    this.bucket = 'assets';
    this.baseUrl = 'http://assets.jweboy.com';
    this.listPrefixOptions = {};
  }

  static get config() {
    const config = new qiniuSDK.conf.Config();

    // 空间对应的机房，默认华东地区机房
    // @ts-ignore
    config.zone = qiniuSDK.zone.Zone_z0;
    // 是否使用https域名
    //config.useHttpsDomain = true;
    // 上传是否使用cdn加速
    //config.useCdnDomain = true;

    return config;
  }

  private get mac() {
    return new qiniuSDK.auth.digest.Mac(this.accessKey, this.secretKey);
  }

  private get bucketManager() {
    return new qiniuSDK.rs.BucketManager(this.mac, Qiniu.config);
  }

  private getToken(key?: string) {
    const options = this.getOptions(key);

    const putPolicy = new qiniuSDK.rs.PutPolicy(options);
    return putPolicy.uploadToken(this.mac);
  }

  /**
   * getOptions
   */
  private getOptions(key?: string) {
    const options = {
      scope: key ? `${this.bucket}:${key}` : this.bucket,
      returnBody:
        '{"url":"https://assets.jweboy.com/$(key)","hash":"$(etag)","size":$(fsize),"bucket":"$(bucket)","name":"$(x:name)", "prefix": "$(x:prefix)", "id": "$(uuid)"}',
    };

    return options;
  }

  public uploadFile(key: string, fileObj: File) {
    console.log(33, fileObj);
    const { originalname, buffer } = fileObj;
    const formUploader = new qiniuSDK.form_up.FormUploader(Qiniu.config);
    const putExtra = new qiniuSDK.form_up.PutExtra();
    const fileKey = key ? `${key}/${originalname}` : originalname;
    const token = this.getToken(fileKey);

    console.log('token=>', token);

    // 额外参数
    putExtra.fname = originalname;
    putExtra.params = {
      'x:prefix': key,
    };

    // 文件上传
    return new Promise((resolve, reject) => {
      formUploader.put(token, fileKey, buffer, putExtra, function uploadFile(respErr, respBody, respInfo) {
        if (respErr) {
          reject(respErr);
        } else if (respInfo.statusCode !== 200) {
          reject({ statusCode: respInfo.statusCode, ...respBody });
        } else {
          resolve(respBody);
        }
      });
    });
  }

  public deleteFile(fileObj: FileModel) {
    const { fileName, key } = fileObj;
    const bucketManager = new qiniuSDK.rs.BucketManager(this.mac, Qiniu.config);
    const fileKey = key ? `${key}/${fileName}` : fileName;

    return new Promise((resolve, reject) => {
      bucketManager.delete(this.bucket, fileKey, function uploadFile(respErr, respBody, respInfo) {
        // console.log(respErr, respInfo, respBody);
        if (respErr) {
          reject(respErr);
        } else if (respInfo.statusCode !== 200) {
          reject({ statusCode: respInfo.statusCode, ...respBody });
        } else {
          resolve(respBody);
        }
      });
    });
  }

  /**
   * getFiles
   */
  public getFiles(fileQuery: FileQueryModel) {
    const regexp = /^\//; // 检测前缀是否带有 /
    this.listPrefixOptions.prefix = fileQuery.prefix;
    this.listPrefixOptions.limit = fileQuery.size;

    return new Promise((resolve, reject) => {
      this.bucketManager.listPrefix(this.bucket, this.listPrefixOptions, (respErr, respBody, respInfo) => {
        console.log(respErr, respBody);
        if (respErr) {
          reject(respErr);
        } else if (respInfo.statusCode !== 200) {
          reject({ statusCode: respInfo.statusCode, ...respBody });
        } else {
          const { items } = respBody;
          const nextMarker = respBody.marker;
          // 如果这个nextMarker不为空，那么还有未列举完毕的文件列表，下次调用listPrefix的时候，指定options里面的marker为这个值
          // this.listPrefixOptions.marker = nextMarker;

          const resp = items.reduce((arr, item) => {
            arr.push({
              ...item,
              url: regexp.test(item.key) ? `${this.baseUrl}${item.key}` : `${this.baseUrl}/${item.key}`,
            });
            return arr;
          }, []);
          console.log(resp);
          resolve({
            items: resp,
          });
        }
      });
    });
  }

  /**
   * deleteFiles
   */
  public deleteFiles(data: DeleteFileModel) {
    const { names = [], prefix } = data;
    const operations = names.map((name) => {
      return qiniuSDK.rs.deleteOp(this.bucket, `${prefix}/${name}`);
    });

    return new Promise((resolve, reject) => {
      this.bucketManager.batch(operations, function deleteFiles(respErr, respBody, respInfo) {
        if (respErr) {
          reject(respErr);
        } else if (respInfo.statusCode !== 200) {
          reject({ statusCode: respInfo.statusCode, ...respBody });
        } else {
          resolve(respBody);
        }
      });
    });
  }

  listPrefix() {
    return new Promise((resolve, reject) => {
      const bucketManager = new qiniuSDK.rs.BucketManager(this.mac, Qiniu.config);
      // @ts-ignore
      bucketManager.getBucketInfo('assets', (err, respBody, respInfo) => {
        if (err) {
          reject(err);
        }
        console.log(err, respBody);

        if (respInfo.statusCode === 200) {
          resolve(respBody);
        }
      });
    });
  }

  formatCustomError(err: Error) {
    const { message } = err;
    if (message) {
      const errors = message.split('\n').map((item) => JSON.parse(item));
      const [code, { error }] = errors;
      return { code, msg: error, data: null };
    }
  }

  handleResponseCallback(err, respBody, respInfo) {
    if (err !== null) {
      return this.formatCustomError(err);
    } else {
      const { statusCode } = respInfo;
      if (statusCode == 200) {
        return { code: SUCCEED_CODE, data: respBody, msg: '请求成功' };
      } else {
        return { code: statusCode, msg: respBody.error, data: null };
      }
    }
  }

  getPublicUrl(key: string) {
    const url = this.bucketManager.publicDownloadUrl(this.baseUrl, key);
    return url;
  }

  // @ts-ignore
  getFileInfo<T>(bucket: string, key: string): Promise<Public.Response<T>> {
    return new Promise((resolve) => {
      this.bucketManager.stat(bucket || this.bucket, key, (err, respBody, respInfo) => {
        // console.log(err, respBody, respInfo);
        const result = this.handleResponseCallback(err, respBody, respInfo);
        resolve(result);
      });
    });
  }
}

const qiniu = new Qiniu();

export default qiniu;
