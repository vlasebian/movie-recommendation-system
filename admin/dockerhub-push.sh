docker build -t local-admin .
docker tag local-admin vlasebian/idp-admin:latest
docker push vlasebian/idp-admin:latest
