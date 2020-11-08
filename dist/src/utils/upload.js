"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const qiniu_1 = tslib_1.__importDefault(require("qiniu"));
class Qiniu {
    constructor() {
        this.accessKey = 'KgNS98Sj66CuXFi64xNHs11vfrO8iXmX8Zcht-Id';
        this.secretKey = 'gohLJusvDqZcwwYaL_DcF-KeTDX65zDdEzaEyayP';
        this.bucket = 'assets';
        this.baseUrl = 'http://assets.jweboy.com';
        this.listPrefixOptions = {};
    }
    static get config() {
        const config = new qiniu_1.default.conf.Config();
        return config;
    }
    get mac() {
        return new qiniu_1.default.auth.digest.Mac(this.accessKey, this.secretKey);
    }
    get bucketManager() {
        return new qiniu_1.default.rs.BucketManager(this.mac, Qiniu.config);
    }
    getToken(key) {
        const options = this.getOptions(key);
        const putPolicy = new qiniu_1.default.rs.PutPolicy(options);
        return putPolicy.uploadToken(this.mac);
    }
    getOptions(key) {
        const options = {
            scope: key ? `${this.bucket}:${key}` : this.bucket,
            returnBody: '{"url":"http://assets.jweboy.com/$(key)","hash":"$(etag)","size":$(fsize),"bucket":"$(bucket)","name":"$(fname)", "prefix": "$(x:prefix)", "id": "$(uuid)"}',
        };
        return options;
    }
    uploadFile(key, fileObj) {
        const { originalname, buffer } = fileObj;
        const formUploader = new qiniu_1.default.form_up.FormUploader(Qiniu.config);
        const putExtra = new qiniu_1.default.form_up.PutExtra();
        const fileKey = key ? `${key}/${originalname}` : originalname;
        const token = this.getToken(fileKey);
        putExtra.fname = originalname;
        putExtra.params = {
            'x:prefix': key,
        };
        return new Promise((resolve, reject) => {
            formUploader.put(token, fileKey, buffer, putExtra, function uploadFile(respErr, respBody, respInfo) {
                if (respErr) {
                    reject(respErr);
                }
                else if (respInfo.statusCode !== 200) {
                    reject({ statusCode: respInfo.statusCode, ...respBody });
                }
                else {
                    resolve(respBody);
                }
            });
        });
    }
    deleteFile(fileObj) {
        const { fileName, key } = fileObj;
        const bucketManager = new qiniu_1.default.rs.BucketManager(this.mac, Qiniu.config);
        const fileKey = key ? `${key}/${fileName}` : fileName;
        return new Promise((resolve, reject) => {
            bucketManager.delete(this.bucket, fileKey, function uploadFile(respErr, respBody, respInfo) {
                if (respErr) {
                    reject(respErr);
                }
                else if (respInfo.statusCode !== 200) {
                    reject({ statusCode: respInfo.statusCode, ...respBody });
                }
                else {
                    resolve(respBody);
                }
            });
        });
    }
    getFiles(fileQuery) {
        const regexp = /^\//;
        this.listPrefixOptions.prefix = fileQuery.prefix;
        this.listPrefixOptions.limit = fileQuery.size;
        console.log(this.listPrefixOptions);
        return new Promise((resolve, reject) => {
            this.bucketManager.listPrefix(this.bucket, this.listPrefixOptions, (respErr, respBody, respInfo) => {
                if (respErr) {
                    reject(respErr);
                }
                else if (respInfo.statusCode !== 200) {
                    reject({ statusCode: respInfo.statusCode, ...respBody });
                }
                else {
                    const { items } = respBody;
                    const nextMarker = respBody.marker;
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
    deleteFiles(data) {
        const { names = [], prefix } = data;
        const operations = names.map((name) => {
            return qiniu_1.default.rs.deleteOp(this.bucket, `${prefix}/${name}`);
        });
        return new Promise((resolve, reject) => {
            this.bucketManager.batch(operations, function deleteFiles(respErr, respBody, respInfo) {
                if (respErr) {
                    reject(respErr);
                }
                else if (respInfo.statusCode !== 200) {
                    reject({ statusCode: respInfo.statusCode, ...respBody });
                }
                else {
                    resolve(respBody);
                }
            });
        });
    }
}
exports.Qiniu = Qiniu;
exports.default = Qiniu;
//# sourceMappingURL=upload.js.map