# graphql-boilerplate

![](https://imgur.com/eMpNw0e.png)

Boilerplate for a scalable, production-ready GraphQL gateway server.

A hosted demo is available at https://graphql-bp.now.sh

## Features

* Database (via [Graphcool](https://graph.cool))
* User authentication

## Getting started

#### Requirements

* Node 8 (or higher)
* Graphcool CLI (Get it via `npm i -g graphcool@beta`)
* GraphQL CLI (Get it via `npm i -g graphql-cli@beta`)
* Optional: GraphQL Playground desktop app (Download [here](https://github.com/graphcool/graphql-playground/releases))

#### Setting up your project

##### 1. Via `graphql-cli`

```sh
# 1 .From your root directory of choice execute:
graphql create [project-name]

# 2. Choose the "Basic (TypeScript, DB, Auth) option

# 3. Navigate to the new project
cd [project-name]

#4. Deploy the Graphcool database
graphcool deploy
```

##### 2. By cloning repo

```sh
# 1. Clone the repo
git clone https://github.com/graphcool/graphql-boilerplate.git

# 2. Deploy the Graphcool database
graphcool deploy
```

#### Launch the local server

```sh
# Start server (runs on http://localhost:4000)
yarn start

# Open Playground to explore GraphQL API
yarn playground
```

## Docs

### Commands

* `yarn start` starts GraphQL server
* `yarn debug` starts GraphQL server in debug mode (open [chrome://inspect/#devices](chrome://inspect/#devices) to debug)
* `yarn playground` opens the GraphQL Playground
* `yarn build` builds the application
* `yarn deploy` deploys GraphQL server to [`now`](https://now.sh)

### Project Overview
#### `/`
- [`.env`](https://github.com/graphcool/graphql-boilerplate/blob/master/.env) Contains important environment variables for development. Read more about `.env` [here](https://github.com/motdotla/dotenv)
- [`.graphqlconfig.yml`](https://github.com/graphcool/graphql-boilerplate/blob/master/.graphqlconfig.yml) GraphQL Config file containing the endpoints and schema configuration. Used by the [`graphql-cli`](https://github.com/graphcool/graphql-cli) and the [GraphQL Playground](https://github.com/graphcool/graphql-playground). See [graphql-config](https://github.com/graphcool/graphql-config) for more information.

#### `/database`
- [`/database/datamodel.graphql`](https://github.com/graphcool/graphql-boilerplate/blob/master/database/datamodel.graphql) contains the Database model that you define
- [`/database/schema.graphql`](https://github.com/graphcool/graphql-boilerplate/blob/master/database/schema.graphql) contains the database API that is being generated based on your `datamodel.graphql`

#### `/src`
- [`/src/schema.graphql`](https://github.com/graphcool/graphql-boilerplate/blob/master/src/schema.graphql) contains the GraphQL API of your application that is exposed to the world
- [`/src/index.ts`](https://github.com/graphcool/graphql-boilerplate/blob/master/src/index.ts) is the entry point of your application, pulling everything together and starting the [`graphql-yoga`](https://github.com/graphcool/graphql-yoga) Server.
- [`/src/resolvers/`](https://github.com/graphcool/graphql-boilerplate/tree/master/src/resolvers) includes the actual business logic of your application. In GraphQL you implement [resolvers](http://graphql.org/learn/execution/) that *resolve*  a specific query being requested

### Common Questions

#### I'm getting a 'Schema could not be fetched.' error after deploying, what gives?

Access to the Graphcool API is secured by a secret. This also applies to the introspection query. Using the latest version of GraphQL Playground, the `Authorization` header should automatically be setup with a proper JWT signing the secret. If that's not the case, you can follow these steps to access your API:

* Visit http://jwtbuilder.jamiekurtz.com/
* Replace the `Key` at the bottom of the page with [your secret from the `.env` file](https://github.com/graphcool/graphql-boilerplate/blob/master/.env#L3)
* Click `Create signed JWT` and copy the obtained token
* Now, to access the schema, use the `Authorization: Bearer <token>` header, or in the GraphQL Playground set it as JSON:

```json
{
  "Authorization": "Bearer <token>"
}
```

> Note: Currently, no content of the signed JWT is verified. This will be implemented [according to this proposal](https://github.com/graphcool/framework/issues/1365) at a later stage.

## Community

Graphcool has a community of thousands of amazing developers and contributors. Welcome, please join us! 👋

* [Forum](https://www.graph.cool/forum)
* [Slack](https://slack.graph.cool/)
* [Stackoverflow](https://stackoverflow.com/questions/tagged/graphcool)
* [Twitter](https://twitter.com/graphcool)
* [Facebook](https://www.facebook.com/GraphcoolHQ)
* [Meetup](https://www.meetup.com/graphql-berlin)
* [Email](hello@graph.cool)

## Contributing

Your feedback is **very helpful**, please share your opinion and thoughts!
