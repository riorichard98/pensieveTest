# Makefile

# Variables
DOCKER_IMAGE_NAME = gps-api-image
DOCKER_CONTAINER_NAME = gps-api-service

# Build TypeScript, build Docker image, and run Docker container
all:
	rm -rf ./dist && tsc && \
	docker rm -f $(DOCKER_CONTAINER_NAME) || true && \
	docker build -t $(DOCKER_IMAGE_NAME) . && \
	docker run --network=gps-api -p 4000:4000 --name $(DOCKER_CONTAINER_NAME) $(DOCKER_IMAGE_NAME)

# Stop and remove Docker container
clean:
	docker rm -f $(DOCKER_CONTAINER_NAME)

.PHONY: all clean
