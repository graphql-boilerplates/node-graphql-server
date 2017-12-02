# graphql-boilerplate-typescript

Boilerplate for a scalable, production-ready GraphQL server ([Hosted Demo](https://graphql-bp.now.sh/))

## Features

* User authentication & permissions
* Unit tests
* Logging & performance tracing

## Getting started

### 1. Setup project

```sh
# Create a new directory
mkdir graphql-server
cd graphql-server

# download boilerplate
curl https://codeload.github.com/graphcool/graphql-boilerplate/tar.gz/orm | tar -xz --strip=1 graphql-boilerplate-orm

# install dependencies
yarn
```

### 2. Deploy Graphcool database

```sh
# Deploy database
# ... and copy `Simple API` endpoint to .env file as `GRAPHCOOL_ENDPOINT`
graphcool deploy

# Get root token and copy to .env file as `GRAPHCOOL_APIKEY`
graphcool root-token apikey
```

### 3. Launch local server

```sh
# Start server and open http://localhost:4000
yarn start
```

## Deployment

*WIP*

## TODO

* [ ] Subsriptions
* [ ] Unit tests
* [ ] Logging
