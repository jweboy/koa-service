/*
 * @Author: jweboy
 * @Date: 2021-10-05 11:34:53
 * @LastEditors: jweboy
 * @LastEditTime: 2021-10-05 11:38:32
 */
/*
 * @Author: jweboy
 * @Date: 2020-03-08 22:13:55
 * @LastEditors: jweboy
 * @LastEditTime: 2021-06-13 18:15:02
 */
import Router from 'koa-router';
import { getBuckets } from '../../controller/qiniu/bucket';

const router = new Router();

const qiniuRouter = router.get('/buckets', getBuckets);

export default qiniuRouter;
