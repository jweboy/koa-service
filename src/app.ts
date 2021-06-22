/*
 * @Author: jweboy
 * @Date: 2020-02-20 21:10:41
 * @LastEditors: jweboy
 * @LastEditTime: 2021-06-14 11:35:21
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
import { DB_ERROR_DATA_DUPLICATION } from './contants/locale';

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
    console.log(`🚀 Server running at ${PROTOCOL}://${HOST}:${PORT}/api`);
  } catch (err) {
    console.log('err=>', err);
    throw err;
  }
  // console.log(`🚀 Server running at ${PROTOCOL}://${HOST}:${PORT}/api`);
});

app.on('error', (err) => {
  console.log('app error=>', err);
});

process.on('unhandledRejection', (err) => {
  throw err;
});
