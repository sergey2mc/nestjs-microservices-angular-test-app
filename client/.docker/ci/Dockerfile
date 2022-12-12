# Stage 1, "build-stage", based on Node.js, to build and compile the frontend
# Create image based off of the official Node 14 image
FROM node:14-alpine as build-stage

# Create a directory where our app will be placed
RUN mkdir -p /app

# Change directory so that our commands run inside this new dir
WORKDIR /app

# Get all the code needed to run the app
COPY ./ /app/

# Install dependecies
RUN yarn

# Run build
RUN yarn build --configuration=production --output-path=./dist/out

# Stage 2, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.23.2-alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy nginx config file
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copy dist folder fro build stage to nginx public folder
COPY --from=build-stage /app/dist/out /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NgInx service
CMD ["nginx", "-g", "daemon off;"]
