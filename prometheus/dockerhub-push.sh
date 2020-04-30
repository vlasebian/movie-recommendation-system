docker build -t local-prometheus . --no-cache
docker tag local-prometheus vlasebian/idp-monitor:latest
docker push vlasebian/idp-monitor:latest
