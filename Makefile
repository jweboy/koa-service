commitID=$(shell git log --pretty=format:"%H" -1)

container_name=api-service
port=4000
tag=latest
aliyun_registry=registry.cn-hangzhou.aliyuncs.com

# --network network-connect-middleware

build-image:
	@echo "============= docker build image ============="
	docker build -t jweboy/${container_name}:${tag} .
check-container:
	docker ps -a | grep ${container_name} &> /dev/null
run-container:
	@echo "============= docker run container ============="
	docker run \
  -p ${port}:${port} \
  -d \
  --name ${container_name} \
  --link mysql-service_5.6:db \
  jweboy/${container_name}:${tag}
remove-container:
	@echo "============= remove container ============="
	docker rm -f ${container_name}
stop-container:
	@echo "============= stop container ============="
	docker stop ${container_name}
make-tag:
  @echo "============= make tag ============="
  docker tag jweboy/api-service registry.cn-hangzhou.aliyuncs.com/jweboy/api-service:latest
push-image:
	@echo "============= docker push image ============="
	docker push ${aliyun_registry}/jweboy/${container_name}:${tag}
pull-image:
	@echo "============= docker pull image ============="
	docker pull registry.cn-hangzhou.aliyuncs.com/jweboy/${container_name}:${tag}
