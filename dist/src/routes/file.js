"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const koa_router_1 = tslib_1.__importDefault(require("koa-router"));
const multer_1 = tslib_1.__importDefault(require("@koa/multer"));
const file_1 = require("../controller/file");
const router = new koa_router_1.default();
const upload = multer_1.default();
const fileRouter = router
    .get('/files', file_1.getFiles)
    .post('/file/upload', upload.single('file'), file_1.uploadFile)
    .delete('/file/multiple-delete', file_1.deleteFiles)
    .delete('/file/delete', file_1.deleteFile);
exports.default = fileRouter;
//# sourceMappingURL=file.js.map