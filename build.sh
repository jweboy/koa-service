#!/bin/bash

###
# @Author: jweboy
# @Date: 2021-12-23 11:39:51
# @LastEditors: jweboy
# @LastEditTime: 2022-01-04 18:32:20
###

image=koa_service
container=koa_service
port=5001
today=$(date +"%Y%m%d")

# pnpm run build

docker build -t $image:$today .

docker ps -a | grep $container &>/dev/null

if [ $? -eq 0 ]; then
  docker rm -f $container
fi

pnpm build

docker run \
  --detach \
  --publish $port:$port \
  --name $container \
  $image:$today
