#!/bin/bash

###
# @Author: jweboy
# @Date: 2021-12-23 18:31:08
# @LastEditors: jweboy
# @LastEditTime: 2022-01-04 18:32:38
###

port=5001
today=$(date +"%Y%m%d")
image=koa_service
container=koa_service
aliyun_registry=registry.cn-hangzhou.aliyuncs.com/biubiubiu_public

docker pull $aliyun_registry/$image:$today

docker ps -a | grep $container &>/dev/null

if [ $? -eq 0 ]; then
  docker rm -f $container
fi

docker run \
  --detach \
  --publish $port:$port \
  --name $container \
  $aliyun_registry/$image:$today
