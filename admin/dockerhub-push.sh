docker build -t local-admin . --no-cache
docker tag local-admin vlasebian/idp-admin:latest
docker push vlasebian/idp-admin:latest
