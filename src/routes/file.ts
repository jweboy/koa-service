/*
 * @Author: jweboy
 * @Date: 2020-03-08 22:13:55
 * @LastEditors: jweboy
 * @LastEditTime: 2022-04-20 11:14:52
 */
import Router from 'koa-router';
import multer from '@koa/multer';
import { uploadFile, deleteFile, getFiles, deleteFiles } from '../controller/qiniu/_file';

const router = new Router();
const upload = multer();

const qiniuFileRouter = router
  .get('/files', getFiles)
  .post('/file/upload', upload.single('file'), uploadFile)
  .delete('/file/multiple-delete', deleteFiles)
  .delete('/file/delete', deleteFile);

export default qiniuFileRouter;
