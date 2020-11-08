/*
 * @Author: jweboy
 * @Date: 2020-11-07 21:53:50
 * @LastEditors: jweboy
 * @LastEditTime: 2020-11-08 23:55:50
 */
import Router from 'koa-router';
import { createDirectory, getDirectories } from '../../controller/assets/directories';

const router = new Router();

const directoryRouter = router
  .get('/assets/directory/', getDirectories)
  .post('/assets/directory/create', createDirectory);

export default directoryRouter;
