docker build -t local-frontend .
docker tag local-frontend vlasebian/idp-frontend:latest
docker push vlasebian/idp-frontend:latest
