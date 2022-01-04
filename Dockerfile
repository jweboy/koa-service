FROM node:12-alpine as build

WORKDIR /home/app

COPY ["package.json", ".npmrc", "./"]
RUN npm i -g pnpm
RUN pnpm install --production

COPY . .

ENV NODE_ENV=production
ENV SERVER_HOST=localhost
ENV SERVER_PORT=5001
ENV DB_HOST=rm-bp18bi364r33z24d64o.mysql.rds.aliyuncs.com
ENV DB_PORT=3306
ENV DB_TYPE=mysql
ENV DB_TABLE=demo
ENV DB_USER=jl
ENV DB_PASSWORD=Jl940630

CMD ["node", "dist/app.js"]
