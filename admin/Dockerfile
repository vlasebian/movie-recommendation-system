FROM node:latest

# set working directory
RUN mkdir /root/app-admin
WORKDIR	/root/app-admin

# copy app files
COPY ./src/ /root/app-admin
# install app dependencies
#COPY ./src/package.json /root/app-admin/
RUN npm install -g @angular/cli
RUN npm install

# expose port
EXPOSE 4200

# build app and start the frontend server
#RUN npx ng serve -o --host 0.0.0.0
