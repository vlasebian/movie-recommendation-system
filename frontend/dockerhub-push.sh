docker build -t local-frontend . --no-cache
docker tag local-frontend vlasebian/idp-frontend:latest
docker push vlasebian/idp-frontend:latest
