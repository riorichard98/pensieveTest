# Makefile

# Variables
DOCKER_IMAGE_NAME = gps-api-image
DOCKER_CONTAINER_NAME = gps-api-service

# Build TypeScript, build Docker image, and run Docker container

# add more command sleep 10s to wait 10s to make sure the postgre is done for composing
run-frontend:
	cd frontend && \
	npm install && \
	npm run dev

run-backend:
	docker-compose up -d --no-recreate && \
	echo "Waiting for 10 seconds to make sure PostgreSQL is running..." && \
	sleep 10 && \
	cd backend && \
	rm -rf ./dist && tsc && \
	docker build -t $(DOCKER_IMAGE_NAME) . && \
	docker rm -f $(DOCKER_CONTAINER_NAME) || true && \
	docker run --network=gps-api -p 4000:4000 --name $(DOCKER_CONTAINER_NAME) $(DOCKER_IMAGE_NAME) 
	
# Stop and remove Docker container
clean:
	docker rm -f $(DOCKER_CONTAINER_NAME)&&\
	docker-compose down
	lsof -ti :3000 | xargs kill -9 || true
.PHONY: all clean
