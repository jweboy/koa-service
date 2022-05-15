import Router from 'koa-router';
import { getDocs } from '../controller/quyue';

const router = new Router();

const yuqueRouter = router.prefix('/yuque').get('/docs', getDocs);

export default yuqueRouter;
