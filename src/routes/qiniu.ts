/*
 * @Author: jweboy
 * @Date: 2021-10-05 11:34:53
 * @LastEditors: jweboy
 * @LastEditTime: 2022-04-24 14:24:30
 */
/*
 * @Author: jweboy
 * @Date: 2020-03-08 22:13:55
 * @LastEditors: jweboy
 * @LastEditTime: 2021-06-13 18:15:02
 */
import Router from 'koa-router';
import { getFileInfo } from '../controller/qiniu/file';
import { getBuckets } from '../controller/qiniu/bucket';

const router = new Router();

const qiniuRouter = router.get('/buckets', getBuckets).get('/file/info', getFileInfo);

export default qiniuRouter;
