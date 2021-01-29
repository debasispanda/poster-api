# Poster API

## Prequisites
Basic understanding on JavaScript, NodeJS and Postgres.

## Steps to run in local

### 1. Clone the repository.

### 2. Install Packages
```
cd <Project Dir>
npm install
```

### 3. Generate .env file with following command by answering few questions.

```
npm run generate-config
```

### 4. Build Docker Image
```
npm run docker:build
```

### 5. Start Containers
```
npm run docker:start
```
This will run both postgres and app container. You can use postman client to access API on localhost:3000.

On startup it will create the required tables and insert default data like default roles and users. 

### 6. Clean Containers
You can clean the containers by using following commands.
```
npm run docker:clean
```


## APIs
### 1. Auth

Login User
```
POST /api/auth/login
{
    email: <user-email>,
    password: <user-password>
}
```

Logout User
```
POST /api/auth/logout
```

### 2. Users

List all the users
```
GET /api/users
```

List single user
```
GET /api/users/:id
```

Create user
```
POST /api/users
{
    email: <string>, 
    firstname: <string>, 
    lastname: <string>, 
    password: <string>, 
    roles: Array<string>
}
```

Delete user
```
DELETE /api/users/:id
```

### 3. Roles
List all the roles
```
GET /api/roles
```

List single role
```
GET /api/roles/:id
```

Create role
```
POST /api/roles
{
    name: <string>,
    priviledges: Array<string>,
    description: <string>
}
```

Delete role
```
DELETE /api/roles/:id
```
