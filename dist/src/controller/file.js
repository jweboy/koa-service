"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../contants/response");
const upload_1 = require("../utils/upload");
const qiniu = new upload_1.Qiniu();
async function uploadFile(ctx) {
    const { body } = ctx.request;
    console.log('上传文件请求参数 ----->', body, ctx.file);
    try {
        const fileData = await qiniu.uploadFile(body.key, ctx.file);
        const resp = {
            data: fileData,
            msg: response_1.STATUS_TEXT[response_1.StatusCode.Success].text,
            code: response_1.StatusCode.Success,
        };
        ctx.body = resp;
    }
    catch (err) {
        ctx.body = {
            code: err.statusCode,
            data: null,
            msg: err.error,
        };
    }
}
exports.uploadFile = uploadFile;
async function deleteFile(ctx) {
    const { body } = ctx.request;
    console.log('删除文件请求参数 ----->', body);
    try {
        const resp = await qiniu.deleteFile(body);
        ctx.body = {
            code: 0,
            data: resp,
            msg: response_1.STATUS_TEXT[response_1.StatusCode.Success].text,
        };
    }
    catch (err) {
        ctx.body = {
            code: err.statusCode,
            data: null,
            msg: err.error,
        };
    }
}
exports.deleteFile = deleteFile;
async function getFiles(ctx) {
    const { query } = ctx.request;
    try {
        const data = await qiniu.getFiles(query);
        const files = data.items.reduce((arr, file, index) => {
            arr.push({
                ...file,
                id: index + 1,
                name: file.key,
            });
            return arr;
        }, []);
        const resp = {
            data: { items: files },
            msg: response_1.STATUS_TEXT[response_1.StatusCode.Success].text,
            code: response_1.StatusCode.Success,
        };
        ctx.body = resp;
    }
    catch (err) {
        ctx.body = {
            code: err.statusCode,
            data: null,
            msg: err.error,
        };
    }
}
exports.getFiles = getFiles;
async function deleteFiles(ctx) {
    const { body } = ctx.request;
    console.log('批量删除文件请求参数 ----->', body);
    try {
        const resp = await qiniu.deleteFiles(body);
        ctx.body = {
            code: 0,
            data: resp,
            msg: response_1.STATUS_TEXT[response_1.StatusCode.Success].text,
        };
    }
    catch (err) {
        ctx.body = {
            code: err.statusCode,
            data: null,
            msg: err,
        };
    }
}
exports.deleteFiles = deleteFiles;
//# sourceMappingURL=file.js.map