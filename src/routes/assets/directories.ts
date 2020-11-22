/*
 * @Author: jweboy
 * @Date: 2020-11-07 21:53:50
 * @LastEditors: jweboy
 * @LastEditTime: 2020-11-21 14:53:47
 */
import Router from 'koa-router';
import { createDirectory, deleteDirectory, getDirectories } from '../../controller/assets/directories';

const router = new Router();

const directoryRouter = router
  .get('/assets/directory/list', getDirectories)
  .post('/assets/directory/create', createDirectory)
  .delete('/assets/directory/delete', deleteDirectory);

export default directoryRouter;
