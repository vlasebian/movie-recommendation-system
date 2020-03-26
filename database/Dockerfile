FROM mongo:latest

ENV MONGO_INITDB_ROOT_USERNAME=root
ENV MONGO_INITDB_ROOT_PASSWORD=pass
ENV MONGO_INITDB_DATABASE=recommendr

COPY init/init-users.js /docker-entrypoint-initdb.d/init-users.js

EXPOSE 27017