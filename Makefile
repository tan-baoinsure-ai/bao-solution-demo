.PHONY: help docker-build docker-run

IMAGE ?= bao-demo:latest

help:
	@echo "Targets:"
	@echo "  make docker-build   Build the nginx Docker image"
	@echo "  make docker-run     Run the image locally on http://localhost:8080"

docker-build:
	docker build -t $(IMAGE) .

docker-run:
	docker run --rm -p 8080:80 $(IMAGE)
