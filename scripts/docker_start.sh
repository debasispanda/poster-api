#!/bin/sh

CONFIG_FILE=./.env

# Check if docker is installed
if [ ! -x "$(command -v docker)" ]; then
    echo "\nDocker not found! Retry after installing.\n"
    exit 1
fi

# Crate network
docker network create poster_bridge

# Start postgres container
if [ ! "$(docker ps -q -f name=postgres)" ]; then
  if [ "$(docker ps -aq -f status=exited -f name=postgres)" ]; then
    # start exited container
    printf "Starting postgres: "
    docker start postgres
  else
    # Run new postgres container
    docker run -d -p 5432:5432  \
    --name postgres \
    --hostname postgres \
    --env-file ./.env \
    --network poster_bridge \
    postgres
  fi
fi

# Start app container
if [ ! "$(docker ps -q -f name=poster_api)" ]; then
  if [ "$(docker ps -aq -f status=exited -f name=poster_api)" ]; then
    # start exited container
    printf "Starting Poster API: "
    docker start poster_api
  else
    # Run new app container
    docker run -d -p 3000:3000  \
    --name poster_api \
    --env-file ./.env \
    --network poster_bridge \
    poster_api
  fi
fi
