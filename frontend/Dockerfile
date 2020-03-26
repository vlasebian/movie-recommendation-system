# stage one: get static files from Angular project
FROM node:latest as node

RUN mkdir /app
WORKDIR /app

COPY ./src/ /app

RUN npm install
RUN npm run build --prod

# stage two: setup nginx server
FROM nginx:alpine

# remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# copy angular project from build stage 
COPY --from=node /app/dist/frontend /usr/share/nginx/html

# copy nginx configuration file
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# expose port 80
EXPOSE 80

