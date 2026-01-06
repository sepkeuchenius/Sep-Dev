.PHONY: build push run
NAME=sep-dev-website

build:
	docker buildx build --platform "linux/arm64/v8"  -t registry.sep.dev/${NAME} --load .

push:
	docker push registry.sep.dev/${NAME}

run:
	docker run -p 3000:3000 registry.sep.dev/${NAME}

yeet: build push


deploy: yeet restart

restart:
	kubectl apply -f k8s/deploy.yaml
	kubectl apply -f k8s/ingress.yaml
	kubectl rollout restart deployment/${NAME} -n sep-dev