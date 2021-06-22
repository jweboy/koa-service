/*
 * @Author: jweboy
 * @Date: 2021-06-14 00:51:51
 * @LastEditors: jweboy
 * @LastEditTime: 2021-06-14 00:54:16
 */
module.exports = {
  apps: [
    {
      script: 'dist/app.js',
    },
  ],
  env: {
    NODE_ENV: 'development',
    PORT: 4000,
    PROTOCOL: 'http',
    HOST: '0.0.0.0',
    DB_TYPE: 'mysql',
    DB_TABLE: 'couponMiniprogram',
    DB_HOST: '127.0.0.1',
    DB_PORT: 3306,
    DB_USER: 'root',
    DB_PASSWORD: 'jl940630',
  },
  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};
