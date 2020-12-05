# Posters API

## Prequisites
Basic understanding on JavaScript, NodeJS and Postgres.

## Steps to run in local

### 1. Install postgres.

### 2. Install Packages
```
cd <Project Dir>
npm install
```

### 3. Generate .env file with following format in the root directory of project.

```
PORT=<express-server-port>      // port on which express server runs(default 3000)     
PGUSER=<postgres-username>      // postgres user name
PGPASSWORD=<postgres-password>  // postgres password
PGHOST=<postgres-hostname>      // hostname(localhost for development env)
PGDATABASE=<postgres-database>  // name of the database(default poster_db)
PGPORT=<postgres-port>          // port on which postgres is running
SESSION_SECRET=<session-secret> // secret for session
SESSION_NAME=<session-name>     // name of the session
SESSION_AGE=<session-max-age>   // maximum session time
```

### 4. Setup Project
```
npm run setup
```

### 5. Start
```
npm run start:dev
```
You can access API on localhost:3000 or localhost:<PORT>