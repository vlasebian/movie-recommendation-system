#### docker-machine

Create a docker machine:
`docker-machine create --driver virtualbox <vmname>`

See all created docker machines:
`docker-machine ls`

Connect to docker machine (using ssh):
`docker-machine ssh <vmname>`

Copy files to a vm:
`docker-machine scp <filename> <vmname>:.`

Create a swarm (issue this command on the vm that will be the manager):
`docker swarm init --advertise-addr <ip>`
- ip address of the advertising interface

Add other vms to the swarm:
`docker swarm join --token <token>`
- the token is obtained from the swarm init command

See all the nodes from the current swarm:
`docker node ls`

Deploy service stack (issue this command on the manager vm):
`docker stack deploy -c <docker-compose.yml> <app-name>`

See the status of the services in the stack:
`docker stack ps <app-name>`

See the logs of a service:
`docker service logs -f <service-name>`

Get info about the services in the stack:
`docker stack services <stack-name>`

Restart service with:
`docker service update --force <id>`
