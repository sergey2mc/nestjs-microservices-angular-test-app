# Create image based off of the official Node 19 image
FROM node:19-alpine

# Create a directory where our app will be placed
RUN mkdir -p /doc-microservice

# Change directory so that our commands run inside this new dir
WORKDIR /doc-microservice

# Get all the code needed to run the app
COPY ../.. /doc-microservice

# Install dependecies
RUN yarn

# Build code
RUN ["yarn", "build:doc-microservice"]
