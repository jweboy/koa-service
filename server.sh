#!/bin/sh

###
 # @Author: jweboy
 # @Date: 2020-02-20 21:06:14
 # @LastEditors: jweboy
 # @LastEditTime: 2020-02-22 21:49:12
 ###

container="api-service"
tag="latest"
port="4001"

# pull image
docker pull jweboy/${container}:${tag}

# cleanup container if exited but stoped
if [ "$(docker ps -a -f status=exited -f name=${container})" ]; then
    docker rm -f ${container}
fi

# # cleanup
if [ "$(docker ps -a | grep ${container})" ]; then
    docker stop ${container}
fi

# run container
docker run \
-p ${port}:${port} \
-d \
--name ${container} \
--rm \
jweboy/${container}:${tag}
