# Remove containers
docker rm -f $(docker ps -aq)

# Remove netowrk
docker network rm poster_bridge