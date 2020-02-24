# build the new images
docker build -t ajduet/complex-client:latest -t ajduet/complex-client:$SHA -f ./complex-client/Dockerfile ./complex-client
docker build -t ajduet/complex-api:latest -t ajduet/complex-api:$SHA -f ./api/Dockerfile ./api
docker build -t ajduet/complex-worker:latest -t ajduet/complex-worker:$SHA -f ./worker/Dockerfile ./worker

# push images to docker
docker push ajduet/complex-client:latest
docker push ajduet/complex-client:$SHA
docker push ajduet/complex-api:latest
docker push ajduet/complex-api:$SHA
docker push ajduet/complex-worker:latest
docker push ajduet/complex-worker:$SHA

# apply our kube config
kubectl apply -f ./k8s
kubectl set image deployments/complex-api-deployment api=ajduet/complex-api:$SHA
kubectl set image deployments/client-deployment client=ajduet/complex-client:$SHA
kubectl set image deployments/complex-worker-deployment worker=ajduet/complex-worker:$SHA
