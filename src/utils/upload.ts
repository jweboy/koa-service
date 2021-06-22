/*
 * @Author: jweboy
 * @Date: 2020-03-09 00:03:22
 * @LastEditors: jweboy
 * @LastEditTime: 2021-06-13 18:02:47
 */
import qiniu, { rs } from 'qiniu';
import { File } from '@koa/multer';
import { FileModel, FileQueryModel, DeleteFileModel } from '../typings/file';

export class Qiniu {
  secretKey: string;

  accessKey: string;

  bucket: string;

  baseUrl: string;

  listPrefixOptions: rs.ListPrefixOptions;

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
    const config = new qiniu.conf.Config();

    return config;
  }

  private get mac() {
    return new qiniu.auth.digest.Mac(this.accessKey, this.secretKey);
  }

  private get bucketManager() {
    return new qiniu.rs.BucketManager(this.mac, Qiniu.config);
  }

  private getToken(key?: string) {
    const options = this.getOptions(key);

    const putPolicy = new qiniu.rs.PutPolicy(options);
    return putPolicy.uploadToken(this.mac);
  }

  /**
   * getOptions
   */
  private getOptions(key?: string) {
    const options = {
      scope: key ? `${this.bucket}:${key}` : this.bucket,
      returnBody:
        '{"url":"http://assets.jweboy.com/$(key)","hash":"$(etag)","size":$(fsize),"bucket":"$(bucket)","name":"$(fname)", "prefix": "$(x:prefix)", "id": "$(uuid)"}',
    };

    return options;
  }

  public uploadFile(key: string, fileObj: File) {
    const { originalname, buffer } = fileObj;
    const formUploader = new qiniu.form_up.FormUploader(Qiniu.config);
    const putExtra = new qiniu.form_up.PutExtra();
    const fileKey = key ? `${key}/${originalname}` : originalname;
    const token = this.getToken(fileKey);

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
    const bucketManager = new qiniu.rs.BucketManager(this.mac, Qiniu.config);
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

    console.log(this.listPrefixOptions);

    return new Promise((resolve, reject) => {
      this.bucketManager.listPrefix(this.bucket, this.listPrefixOptions, (respErr, respBody, respInfo) => {
        if (respErr) {
          reject(respErr);
        } else if (respInfo.statusCode !== 200) {
          reject({ statusCode: respInfo.statusCode, ...respBody });
        } else {
          const { items } = respBody;
          const nextMarker = respBody.marker;
          // 如果这个nextMarker不为空，那么还有未列举完毕的文件列表，下次调用listPrefix的时候，指定options里面的marker为这个值
          this.listPrefixOptions.marker = nextMarker;

          const resp = items.reduce((arr, item) => {
            arr.push({
              ...item,
              url: regexp.test(item.key) ? `${this.baseUrl}${item.key}` : `${this.baseUrl}/${item.key}`,
            });
            return arr;
          }, []);
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
      return qiniu.rs.deleteOp(this.bucket, `${prefix}/${name}`);
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
}

export default Qiniu;
