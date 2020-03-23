FROM node:latest

# set working directory
RUN mkdir /root/app-backend
WORKDIR	/root/app-backend

# add node_modules bin directory to PATH for node cli tools
ENV PATH /root/app-backend/node_modules/.bin:$PATH

EXPOSE 3000

# copy app files and install app dependencies
#COPY ./src/package.json /root/app-backend/
COPY ./src/ /root/app-backend
RUN npm install

# start the backend server
#RUN npm run start
