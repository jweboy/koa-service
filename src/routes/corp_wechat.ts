import Router from 'koa-router';
import { getUserInfo } from '../controller/corp_wechat/identity/user_info';
import { getIdentityUrl } from '../controller/corp_wechat/identity';
import { getBuckets } from '../controller/qiniu/bucket';
import { getUserDetail } from '../controller/corp_wechat/identity/user_detail';
import { getCustomerGroupTags, postAddCorpTag } from '../controller/corp_wechat/customer';

const router = new Router();

const corpWechatRoutes = router
  .prefix('/corp/wechat')
  .get('/oauth-url', getIdentityUrl)
  .get('/user-info', getUserInfo)
  .get('/user-detail', getUserDetail)
  .get('/customer/group-tag', getCustomerGroupTags)
  .post('/customer/group-tag', postAddCorpTag);

export default corpWechatRoutes;
