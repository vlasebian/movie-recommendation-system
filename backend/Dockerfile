FROM node:latest

# set working directory
RUN mkdir /root/app-backend
WORKDIR	/root/app-backend

# add node_modules bin directory to PATH for node cli tools
ENV PATH /root/app-backend/node_modules/.bin:$PATH

EXPOSE 3000

COPY ./src/ /root/app-backend
RUN npm install

