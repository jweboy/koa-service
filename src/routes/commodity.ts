/*
 * @Author: jweboy
 * @Date: 2021-06-13 18:18:12
 * @LastEditors: jweboy
 * @LastEditTime: 2022-01-04 16:26:03
 */
import Router from 'koa-router';
import multer from '@koa/multer';
import { createCommodity, deleteCommodityRecord, findCommodity, updateCommodity } from '../controller/commodity';

const router = new Router();

const commodityRouter = router
  .prefix('/mock')
  .get('/commodity/list', findCommodity)
  .post('/commodity', createCommodity)
  .delete('/commodity', deleteCommodityRecord)
  .put('/commodity', updateCommodity);

export default commodityRouter;
