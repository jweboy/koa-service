#!/bin/bash

###
# @Author: jweboy
# @Date: 2021-12-23 14:29:56
# @LastEditors: jweboy
# @LastEditTime: 2022-01-04 18:26:55
###

# 镜像标签，默认才用当天日期作为标识
TAG=$(date +"%Y%m%d")
# 镜像名
IMAGE=koa_service
# 阿里云镜像地址
ALIYUN_REGISTRY=registry.cn-hangzhou.aliyuncs.com/biubiubiu_public
# 读取公钥文件
SSH_PRIVATE_KEY=$(cat ~/.ssh/id_rsa)

pnpm build

docker build \
  --build-arg SSH_PRIVATE_KEY="$SSH_PRIVATE_KEY" \
  -t $IMAGE:"$TAG" .
docker tag $IMAGE:"$TAG" $ALIYUN_REGISTRY/$IMAGE:"$TAG"
docker push $ALIYUN_REGISTRY/$IMAGE:"$TAG"

ssh aliyun "bash -s" <pull.sh
