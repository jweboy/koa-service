#!/bin/sh
###
 # @Author: jweboy
 # @Date: 2021-07-03 22:05:29
 # @LastEditors: jweboy
 # @LastEditTime: 2021-07-03 22:59:44
###

port=3306
ROOT_PASSWORD==jl940630
mount_dir=/Users/jianglei/Database/mysql
source_dir=/var/lib/mysql
container_name=mysql_5.6
image_name=mysql
image_version=5.6

docker ps -a | grep ${container_name} &> /dev/null

# 如果存在容器就删除，反之则新建
if [ $? -eq 0 ]
then
  echo ${container_name}" 已存在，将自动删除该容器"
  docker stop ${container_name}
  docker rm ${container_name}
else
  echo ${container_name}" 不存在，开始新建容器..."
fi

# docker run \
# -p ${port}:${port} \
# -e MYSQL_ROOT_PASSWORD=${ROOT_PASSWORD} \
# -d \
# --restart=always \
# --name ${container_name} \
# ${image_name}:${image_version}
# -v ${mount_dir}:${source_dir} \

docker run \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=jl940630 \
  -d \
  --restart=always \
  --name mysql_5.6 \
  mysql:5.6

