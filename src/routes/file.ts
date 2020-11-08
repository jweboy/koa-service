/*
 * @Author: jweboy
 * @Date: 2020-03-08 22:13:55
 * @LastEditors: jweboy
 * @LastEditTime: 2020-03-22 22:08:48
 */
import Router from 'koa-router';
import multer from '@koa/multer';
import { uploadFile, deleteFile, getFiles, deleteFiles } from '../controller/file';

const router = new Router();
const upload = multer();

const fileRouter = router
  .get('/files', getFiles)
  .post('/file/upload', upload.single('file'), uploadFile)
  .delete('/file/multiple-delete', deleteFiles)
  .delete('/file/delete', deleteFile);

export default fileRouter;
