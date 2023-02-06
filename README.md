# Instructions

## Setup
1. Make sure [Docker](https://docs.docker.com/get-docker/) is installed on your machine.
2. Run `docker compose up` at the root of this directory. This will set up the db called `cyberowl_db` and db client `adminer`
3. Ensure that version 18.x of [Node](https://nodejs.org/en/download/) in installed on your machine.
4. Run `npm i` at the root of this directory to install all required packages.
5. Run `npm run dev` at the root of this directory. This will start the server at (http://localhost:1337)

## Testing and querying
1. You can login to adminer to view and query the db at (http://localhost:8080). The details are as follows:
 ```
        - user: admin
        - password: password
        - server: db
        - database: local_db

```