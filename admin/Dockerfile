FROM node:current-alpine

# set working directory
RUN mkdir /root/app-admin
WORKDIR	/root/app-admin

# install app dependencies
COPY ./src/package.json /root/app-admin/
RUN npm install -g @angular/cli
RUN npm install

# copy app files
COPY ./src/ /root/app-admin

# build app
EXPOSE 4200

# start the frontend server
RUN ng serve -o
