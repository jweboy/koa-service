import { createClient } from 'redis';

/*
 * @Author: jweboy
 * @Date: 2021-12-31 11:42:17
 * @LastEditors: jweboy
 * @LastEditTime: 2021-12-31 18:21:59
 */

const { ALIYUN_REDIS, NODE_ENV, REDIS_CONTAINER_NAME, REDIS_PASSWORD } = process.env;

export const initRedis = async () => {
  const isDev = NODE_ENV === 'development';
  const isProd = NODE_ENV === 'production';
  // const client = new Redis(6379, "redis");
  const client = createClient({
    password: REDIS_PASSWORD,
    database: 1,
    ...(isDev && { url: ALIYUN_REDIS }),
    ...(isProd && {
      socket: { host: REDIS_CONTAINER_NAME },
    }),
  });

  client
    .on('error', (err) => {
      console.log('Redis Client Error', err);
      client.disconnect();
    })
    .on('ready', () => {
      console.log('🤫 Redis client is ready.');
    });

  await client.connect();

  // @ts-ignore
  global.redis = client;
};
