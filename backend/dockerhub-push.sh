docker build -t local-backend .
docker tag local-backend vlasebian/idp-backend:latest
docker push vlasebian/idp-backend:latest
