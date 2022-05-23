/*
 * @Author: jweboy
 * @Date: 2020-02-20 21:10:41
 * @LastEditors: jweboy
 * @LastEditTime: 2022-04-24 14:31:12
 */
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import logger from 'koa-logger';
import router from './routes';
import { createDatebase } from './entities';
import requestIntercept from './middleware/request_intercept';
import './utils/init-env';
import tokenInterceptor from './middleware/token_interceptor';
import { initRedis } from './utils/redis';
import initSocketServer from './utils/socket';

const app = new Koa();
const { SERVER_PORT, SERVER_HOST, DB_HOST, DB_PORT } = process.env;

app
  .use(bodyParser())
  .use(cors())
  .use(router())
  .use(logger())
  .use(requestIntercept());
// .use(tokenInterceptor());

const httpServer = initSocketServer(app);

httpServer.listen(SERVER_PORT, async () => {
  try {
    await createDatebase();
    await initRedis();
    console.log(`👏 Database connection succeeded at http://${DB_HOST}:${DB_PORT}`);
    console.log(`🚀 Server running at http://${SERVER_HOST}:${SERVER_PORT}/api`);
  } catch (err) {
    console.log('err=>', err);
    process.exit(-1);
  }
  // console.log(`🚀 Server running at ${PROTOCOL}://${HOST}:${PORT}/api`);
});

// app.on('error', (err) => {
//   console.log('app error=>', err);
// });

process.on('unhandledRejection', (err) => {
  throw err;
});
