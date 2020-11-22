/*
 * @Author: jweboy
 * @Date: 2020-03-08 22:13:55
 * @LastEditors: jweboy
 * @LastEditTime: 2020-11-21 23:01:41
 */
import Router from 'koa-router';
import multer from '@koa/multer';
import { uploadFile, deleteFile, getFiles, deleteFiles } from '../../controller/assets/file';

const router = new Router();
const upload = multer();

const fileRouter = router
  .get('/assets/files', getFiles)
  .post('/assets/file/upload', upload.single('file'), uploadFile)
  .delete('/assets/file/multiple-delete', deleteFiles)
  .delete('/assets/file/delete', deleteFile);

export default fileRouter;
