FROM node:current-alpine

# set working directory
RUN mkdir /root/app-frontend
WORKDIR	/root/app-frontend

# install app dependencies
COPY ./src/package.json /root/app-frontend/
RUN npm install

# copy app files
COPY ./src/ /root/app-frontend

# build app
EXPOSE 4200

# start the frontend server
RUN ng serve -o
