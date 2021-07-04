commitID=$(shell git log --pretty=format:"%H" -1)

aliyun_registry=registry.cn-hangzhou.aliyuncs.com
container_name=api-service
author=jweboy
port=4000
tag=latest
mysql_name=mysql-service_5.6

# --network network-connect-middleware

build-image:
	@echo "============= docker build image ============="
	docker build -t ${author}/${container_name}:${tag} .
check-container:
	docker ps -a | grep ${container_name} &> /dev/null
run-container:
	@echo "============= docker run container ============="
	docker run \
  -p ${port}:${port} \
  -d \
  --name ${container_name} \
  --link mysql_5.6:db \
  jweboy/${container_name}:${tag}
remove-container:
	@echo "============= remove container ============="
	docker rm -f ${container_name}
stop-container:
	@echo "============= stop container ============="
	docker stop ${container_name}
make-tag:
  @echo "============= make tag ============="
  docker tag jweboy/api-service ${aliyun_registry}/jweboy/api-service:latest
push-image:
	@echo "============= docker push image ============="
	docker push ${aliyun_registry}/jweboy/${container_name}:${tag}
pull-image:
	@echo "============= docker pull image ============="
	docker pull ${aliyun_registry}/jweboy/${container_name}:${tag}
