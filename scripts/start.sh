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
    # Read environment variables
    username=$(grep POSTGRES_USER $CONFIG_FILE | grep -v -P '^\s*#' | cut -d '=' -f 2-)
    password=$(grep POSTGRES_PASSWORD $CONFIG_FILE | grep -v -P '^\s*#' | cut -d '=' -f 2-)
    dbname=$(grep POSTGRES_DB $CONFIG_FILE | grep -v -P '^\s*#' | cut -d '=' -f 2-)
    # Run new postgres container
    docker run -d -p 5432:5432  \
    --name postgres \
    --hostname postgres \
    -e POSTGRES_DB=$dbname \
    -e POSTGRES_USER=$username \
    -e POSTGRES_PASSWORD=$password \
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
    # Read environment variables
    db_url=$(grep DB_URL $CONFIG_FILE | grep -v -P '^\s*#' | cut -d '=' -f 2-)
    session_secret=$(grep SESSION_SECRET $CONFIG_FILE | grep -v -P '^\s*#' | cut -d '=' -f 2-)
    session_name=$(grep SESSION_NAME $CONFIG_FILE | grep -v -P '^\s*#' | cut -d '=' -f 2-)
    session_age=$(grep SESSION_AGE $CONFIG_FILE | grep -v -P '^\s*#' | cut -d '=' -f 2-)

    # Run new postgres container
    docker run -d -p 3000:3000  \
    --name poster_api \
    -e DB_URL=$db_url \
    -e SESSION_SECRET=$session_secret \
    -e SESSION_NAME=$session_name \
    -e SESSION_AGE=$session_age \
    --network poster_bridge \
    poster_api
  fi
fi
