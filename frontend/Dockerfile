FROM node:latest

# set working directory
RUN mkdir /root/app-frontend
WORKDIR	/root/app-frontend

COPY ./src/ /root/app-frontend

# install app dependencies
RUN npm install -g @angular/cli
RUN npm install

EXPOSE 4200

