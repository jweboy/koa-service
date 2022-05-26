#!/bin/bash

###
# @Author: jweboy
# @Date: 2021-12-23 14:29:56
# @LastEditors: jweboy
# @LastEditTime: 2022-01-04 18:26:55
###

today=$(date +"%Y%m%d")
image=koa_service
aliyun_registry=registry.cn-hangzhou.aliyuncs.com/biubiubiu_public

# pnpm build

docker build -t $image:"$today" .
docker tag $image:"$today" $aliyun_registry/$image:"$today"
docker push $aliyun_registry/$image:"$today"

ssh aliyun "bash -s" <pull.sh
