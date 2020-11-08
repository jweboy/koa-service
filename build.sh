###
 # @Author: jweboy
 # @Date: 2020-02-20 21:06:14
 # @LastEditors: jweboy
 # @LastEditTime: 2020-03-23 23:33:05
 ###
container="api-service"
tag="latest"
port="4001"

# make image
docker build \
-t \
jweboy/${container}:${tag} .

# # cleanup container if exited but stoped
# if [ "$(docker ps -a -f status=exited -f name=${container})" ]; then
#     docker rm -f ${container}
# fi

# # cleanup
# if [ "$(docker ps -a | grep ${container})" ]; then
#     docker stop ${container}
# fi

# run container
# docker run \
# -p ${port}:${port} \
# -d \
# --name ${container} \
# jweboy/${container}:${tag}

# push image
docker push jweboy/${container}:${tag}

ssh server < ./server.sh

