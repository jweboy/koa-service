#!/bin/sh

# push image
# docker push jweboy/${container}:${tag}

# ssh server < ./server.sh


# docker run \
#   -p 3306:3306 \
#   -e MYSQL_ROOT_PASSWORD=jl940630 \
#   -v ~/database/mysql:/data/db \
#   -d \
#   --restart=always \
#   --name mysql-service_5.6 \
#   mysql:5.6

image_name="jweboy/api-service"
container_name="api-service"

echo "--------------------- stage: 源码编译 ---------------------"
tsc
if [ $? -eq 0 ]
then
  echo "ts文件编译成功"
fi

echo "--------------------- 构建镜像阶段 ---------------------"
make build-image

if [ $? -eq 0 ]
then
  echo "docker镜像打包成功"
fi

echo "--------------------- 容器运行阶段 ---------------------"
# 判断容器是否存在
make check-container

# 如果存在容器就删除，反之则新建
if [ $? -eq 0 ]
then
    echo $container_name" 已存在，将自动删除容器"
    make remove-container
    make run-container
else
    echo $image_name" 不存在，开始新建容器..."
    make run-container
fi

echo "容器($container_name)新建成功"
