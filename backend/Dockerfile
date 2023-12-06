# Use an official Node.js image as the base image
FROM node:18.12.1

# Set the working directory in the container
WORKDIR /app

# Copy package.json
COPY package.json .

# Copy .env
COPY .env .

# Install project dependencies
RUN npm install

# Copy the entire project to the container
COPY dist/ .

# Expose the port on which the application will run
EXPOSE 4000

# Specify the command to run your application
CMD ["node", "index.js"]
