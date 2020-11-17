/*
 * @Author: jweboy
 * @Date: 2020-02-20 21:10:41
 * @LastEditors: jweboy
 * @LastEditTime: 2020-11-08 23:51:14
 */
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
// import dotenvFlow from 'dotenv-flow';
import cors from '@koa/cors';
import logger from 'koa-logger';
import path from 'path';
import router from './routes';
import db from './entities';
import requestIntercept from './middleware/request-intercept';
import './utils/init-env';

const app = new Koa();
const { PORT, PROTOCOL, HOST, DB_HOST, DB_PORT } = process.env;

app
  .use(bodyParser())
  .use(cors())
  .use(router())
  .use(logger())
  .use(requestIntercept());

app.listen(PORT, async () => {
  try {
    await db.connect();
    console.log(`👏 Database connection succeeded at http://${DB_HOST}:${DB_PORT}`);
    console.log(`🚀 Server running at ${PROTOCOL}://${HOST}:${PORT}/api/pet`);
  } catch (err) {
    console.log('err=>', err);
    throw err;
  }

  // console.log(`🚀 Server running at ${PROTOCOL}://${HOST}:${PORT}/api/pet`);
});

process.on('unhandledRejection', (err) => {
  throw err;
});
