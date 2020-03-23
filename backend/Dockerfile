FROM node:current-alpine

# set working directory
RUN mkdir /root/app-backend
WORKDIR	/root/app-backend

# add node_modules bin directory to PATH for node cli tools
ENV PATH /root/app-backend/node_modules/.bin:$PATH

# install app dependencies
COPY ./src/package.json ./src/package-lock.json /root/app-backend/
RUN npm install

# copy app files
COPY ./src/ /root/app-backend

# build app
EXPOSE 3000

# start the backend server
RUN node ./bin/www
