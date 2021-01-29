#!/bin/sh

CONFIG_FILE=./.env

validate () {
  if [ -z $2 ]
  then
    printf "\nError: Invalid input for $1\n\n"
    exit 1
  fi
}

get_database_details () {
  read -r -p "Postgres username[POSTGRES_USER]? " pg_username
  validate POSTGRES_USER $pg_username

  read -r -p "Postgres password[POSTGRES_PASSWORD]? " pg_password
  validate POSTGRES_PASSWORD $pg_password

  read -r -p "Postgres database[POSTGRES_DB]? " pg_dbname
  validate POSTGRES_DB $pg_dbname

  read -r -p "Session Secret[SESSION_SECRET]? " session_secret
  validate PGPORT $session_secret

  read -r -p "Session Validity[SESSION_AGE]? " session_age
  validate PGPORT $session_secret
}

generate_env_config () {
db_url="postgres://${pg_username}:${pg_password}@postgres:5432/${pg_dbname}"
cat << EOF > $CONFIG_FILE
POSTGRES_USER=$pg_username
POSTGRES_PASSWORD=$pg_password
POSTGRES_DB=$pg_dbname
DB_URL=$db_url
SESSION_NAME=PosterSession
SESSION_SECRET=$session_secret
SESSION_AGE=$session_age
EOF
}

# Generate env config file if doesn't exist
if [ -f "$CONFIG_FILE" ];
then
  printf "%s\n------------------------------------------\n"
  printf "| Postgres configuration already exists. |"
  printf "%s\n------------------------------------------\n"
  printf "\n"
else
  printf "No configuration found!\n"
  printf "Provide following inputs to proceed.\n\n"
  get_database_details
  generate_env_config
fi
