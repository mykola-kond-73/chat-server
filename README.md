# Chat REST API server documentations

----

1. **This is a full-stack application, the client app is located [here](https://github.com/mykola-kond-73/chat).**

2. **Here used NestJS, Socket.io**

3. **Server start on *localhost:5000***

4. **Using SQL dtabase PostgreSQL which must be expanded from the dump (db_dump.sql file)**

---

## Installation

`yarn install` - install all packages

## Running the app

`yarn run start` - start server in production mode

`yarn run start:dev` - start server in development mode

`yarn run start:prod` - start server from *dist* folder file *main*

`yarn run start:debug` - start server in debug mode 

## Test

'yarn run test' - run unit tests

`yarn run test:e2e` - run e2e test

`yarn run test:cov` - run unit test with "--coverage" flag

`yarn run test:debug` - ren unit test in debug mode

## Building

`yarn run build` - run the project build

`yarn run prebuild` - delete dist folder

## Linting 

`yarn run format` - run pretier

`yarn run lint` - run eslint with "--fix" flag

----

# `.env file`
In .env file musst be kyes:

`PORT` - the port on which the server starts (5000)

`POSTGRES_HOST` - database host (localhost)

`POSTGRES_PASS` - database password

`POSTGRES_USER` - database user

`POSTGRES_DB` - database name

`POSTGRES_PORT` - database port

`PRIVATE_KEY_JWT_ACCESS_TOKEN` - secret key for the access token

`PRIVATE_KEY_JWT_REFRESH_TOKEN` - secret key for the refresh token

`ACCESS_TIKEN_LIFE_TIME` - time leave access token

`REFRESH_TOKEN_LIFE_TIME` - time leave refresh token

`SALT` - salt for bycrypt

`SECRET_KEY_SESSION` - secret key for session