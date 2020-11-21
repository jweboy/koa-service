# # 镜像多阶段编译

# # step1
# # 使用生产环境镜像 alpine
# FROM node:10.15.3-alpine AS builder

# # 创建项目目录
# WORKDIR /usr/src/app

# # 下载 node 和 npm
# # RUN apk add --no-cache --update nodejs nodejs-npm

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
# COPY . .

# # 执行相关命令
# # RUN npm run build
# RUN cd dist

# # 全局变量

# ENV NODE_ENV=development
# # ENV NODE_ENV=production

# EXPOSE 4001

# # 运行命令
# CMD npm run debug
# # CMD [ "tsc", "--version" ]


FROM node:10.15.3-alpine

# Create app directory
WORKDIR /usr/local/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install -d --registry=https://registry.npm.taobao.org
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

ENV NODE_ENV=test

EXPOSE 4001
CMD npm run docker
