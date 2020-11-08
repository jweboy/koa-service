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
import router from './routes';
import db from './entities';

// dotenvFlow.config();

const app = new Koa();
// const { PORT, PROTOCOL, HOST, DB_HOST, DB_PORT } = process.env;

const PORT = '4001';
const PROTOCOL = 'http';
const HOST = '127.0.01';
const DB_PORT = '3006';
const DB_HOST = 'localhost';
console.log(PORT, PROTOCOL, HOST);

app
  .use(bodyParser())
  .use(cors({}))
  .use(router())
  .use(logger());

app.listen(PORT, async () => {
  /* eslint-disable */
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
