# graphql-boilerplate

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
curl https://codeload.github.com/graphcool/graphql-boilerplate/tar.gz/master | tar -xz --strip=1 graphql-boilerplate-master

# install dependencies
yarn
```

### 2. Deploy GraphQL database

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

## Docs

### Workflows

* `yarn start` starts GraphQL server
* `yarn debug` starts GraphQL server in debug mode (open [chrome://inspect/#devices](chrome://inspect/#devices) to debug)
* `yarn get-schema` downloads the GraphQL schemas to `schema/*.graphql`
* `yarn playground` opens the GraphQL Playground
* `yarn deploy` deploys the GraphQL server to [now](https://zeit.co/now)

### Deployment

Deploying this project involves two parts: 1) Deploying the GraphQL server and 2) Deploying the GraphQL database

### Debugging

### Testings

*WIP*

## TODO

* [ ] Subsriptions
* [ ] Unit tests
* [ ] Logging
