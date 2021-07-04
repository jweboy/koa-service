# # 镜像多阶段编译

# # step1
# # 使用生产环境镜像 alpine
# FROM node:10.15.3-alpine AS builder

# # 创建项目目录
# WORKDIR /usr/src/app

# # 下载 node 和 npm
# RUN apk add --no-cache --update nodejs nodejs-npm

# # 确保 package.json 和 package-lock.json 都被复制到项目目录
# COPY package*.json ./

# # 使用淘宝镜像源
# RUN npm install -d --registry=https://registry.npm.taobao.org
# # RUN yarn
# # RUN npm i -g typescript --registry=https://registry.npm.taobao.org

# # step2
# # FROM node:10.15.3-alpine

# # 指定项目目录
# # WORKDIR /usr/src/app

# # 下载 node 和 npm
# # RUN apk add --no-cache --update nodejs nodejs-npm

# # 拷贝 node_modules 目录
# # COPY --from=builder /usr/src/app/node_modules ./node_modules

# # 拷贝项目文件
# COPY ./dist .

# # 执行相关命令
# # RUN npm run build
# # RUN cd dist

# # 全局变量

# # ENV NODE_ENV=production

# EXPOSE 4000

# # 运行命令
# CMD npm prod


# # FROM node:10.15.3-alpine

# # # Create app directory
# # WORKDIR /usr/local/app

# # # Install app dependencies
# # # A wildcard is used to ensure both package.json AND package-lock.json are copied
# # # where available (npm@5+)
# # COPY package*.json ./

# # RUN npm install -d --registry=https://registry.npm.taobao.org
# # # If you are building your code for production
# # # RUN npm ci --only=production

# # # Bundle app source
# # COPY . .

# # RUN ls -al

# # # ENV NODE_ENV=test

# # EXPOSE 4000
# # CMD npm run prod

FROM node:10.15.3-alpine AS builder

WORKDIR /home/app

COPY package*.json ./
COPY id_rsa ./
COPY id_rsa.pub ./

RUN npm i  -d --registry=https://registry.npm.taobao.org

COPY dist ./

ENV PORT=4000
ENV HOST=0.0.0.0
ENV PROTOCOL=http
ENV DB_TYPE=mysql
# DB_HOST 容器间连接需要容器名而不是 IP 地址
ENV DB_TABLE=couponMiniprogram
ENV DB_HOST=db
# ENV DB_HOST=127.0.0.1
ENV DB_PORT=3306
ENV DB_USER=root
ENV DB_PASSWORD=jl940630

EXPOSE 4000

CMD ["node", "app.js"]
