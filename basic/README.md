<h1 align="center"><strong>Boilerplate for a basic GraphQL server with Node.js</strong></h1>

<br />

![](https://imgur.com/lIi4YrZ.png)

<div align="center"><strong>🚀 Bootstrap your GraphQL server within seconds</strong></div>
<div align="center">Basic starter kit for a flexible GraphQL server for Node.js - based on best practices from the GraphQL community.</div>

## Features

- **Scalable GraphQL server:** The server uses [`graphql-yoga`](https://github.com/prisma/graphql-yoga) which is based on Apollo Server & Express
- **GraphQL database:** Includes GraphQL database binding to [Prisma](https://www.prismagraphql.com) (running on MySQL)
- **Tooling**: Out-of-the-box support for [GraphQL Playground](https://github.com/prisma/graphql-playground) & [query performance tracing](https://github.com/apollographql/apollo-tracing)
- **Extensible**: Simple and flexible [data model](./database/datamodel.graphql) – easy to adjust and extend
- **No configuration overhead**: Preconfigured [`graphql-config`](https://github.com/prisma/graphql-config) setup

## Requirements

You need to have the [GraphQL CLI](https://github.com/graphql-cli/graphql-cli) installed to bootstrap your GraphQL server using `graphql create`:

```sh
npm install -g graphql-cli
```

## Getting started

```sh
# 1. Bootstrap GraphQL server in directory `my-app`, based on `node-basic` boilerplate
graphql create my-app --boilerplate node-basic

# 2. Navigate to the new project
cd my-app

# 3. Start server (runs on http://localhost:4000) and open GraphQL Playground
yarn dev
```

> **Note**: We recommend that you're using `yarn dev` during development as it will give you access to the GraphQL API or your server (defined by the [application schema](./src/schema.graphql)) as well as to the Prisma API directly (defined by the [Prisma database schema](./generated/prisma.graphql)). If you're starting the server with `yarn start`, you'll only be able to access the API of the application schema.

## Documentation

### Commands

* `yarn start` starts GraphQL server on `http://localhost:4000`
* `yarn dev` starts GraphQL server on `http://localhost:4000` _and_ opens GraphQL Playground
* `yarn playground` opens the GraphQL Playground for the `projects` from [`.graphqlconfig.yml`](./.graphqlconfig.yml)
* `yarn prisma <subcommand>` gives access to local version of Prisma CLI (e.g. `yarn prisma deploy`)

### Project structure

![](https://imgur.com/95faUsa.png)

| File name 　　　　　　　　　　　　　　| Description 　　　　　　　　<br><br>| 
| :--  | :--         |
| `├── .graphqlconfig.yml` | GraphQL configuration file based on[`graphql-config`](https://github.com/prisma/graphql-config) (used by the GraphQL CLI and the GraphQL Playground).|
| `└── database ` (_directory_) | Contains all files that are related to the Prisma database service |\
| `　　├── prisma.yml` | The root configuration file for your Prisma database service ([documentation](https://www.prismagraphql.com/docs/reference/prisma.yml/overview-and-example-foatho8aip)) |
| `　　└── datamodel.graphql` | Defines your data model (written in [GraphQL SDL](https://blog.graph.cool/graphql-sdl-schema-definition-language-6755bcb9ce51)) |
| `└── src ` (_directory_) | Contains the source files for your GraphQL server |
| `　　├── index.js` | The entry point for your GraphQL server |
| `　　├── schema.graphql` | The **application schema** defining the API that's exposed to your client applications  |
| `　　└── generated` (_directory_) | Contains generated files |
| `　　　　└── prisma.grapghql` | The **Prisma database schema** defining the Prisma GraphQL API  |

## Contributing

The GraphQL boilerplates are maintained by the GraphQL community, with official support from the [Apollo](https://dev-blog.apollodata.com) & [Graphcool](https://blog.graph.cool/) teams.

Your feedback is **very helpful**, please share your opinion and thoughts! If you have any questions or want to contribute yourself, join the [`#graphql-boilerplate`](https://graphcool.slack.com/messages/graphql-boilerplate) channel on our [Slack](https://graphcool.slack.com/).

