# graphql-boilerplate
Boilerplate for a scalable, production-ready GraphQL Gateway server

## Features
- Logging
- Custom GraphQL Schema composition using [`graphql-delegate`](https://github.com/graphcool/graphql-stack/tree/master/packages/graphql-delegate)
- Stackable resolvers with [`graphql-stack`](https://github.com/graphcool/graphql-stack)
- Scalable application architecture
- Authentication through JWT
- Before and after hooks for resolvers

... much more!

## Development
### Initializing the Graphcool Service
```
cd backend
gc deploy
gc info # put the simple endpoint into the `GRAPHQL_ENDPOINT` env var in .envrc
gc root-token main # put the root token into the `ADMIN_TOKEN` env var in .envrc
```

### Starting the Gateway
```
yarn install
yarn start
# Open http://localhost:3000/playground
```

### Playing around with the API
To seed some data, use `gc playground` and execute the following mutation:
```graphql
mutation {
  createUser(
    email: "a@a.de"
    password: "abc"
    posts: [{
      title: "Post 0"
    }]
    friends: [{
      email: "a2@a.de"
    	password: "abc"
      posts: [{
        title: "Post 1"
      }, {
        title: "Post 2"
      }, {
        title: "Post 3"
      }]
    }]
  ) {
    id
  }
}
```

Now you can login with the created user against the gateway (`http://localhost:3000/playground`):
```graphql
mutation {
  login(email: "a2@a.de" password:"abc") {
    token
  }
}
```
With the token, you now can check the `viewer` query:
```graphql
{
  viewer {
    me {
      id
    }
    friendsPosts {
      id
    }
  }
}
```

## Learning the code
We highly suggest you check out the code of the Gateway! The [`index.ts`](https://github.com/graphcool/graphql-boilerplate/blob/master/gateway/src/index.ts) is a good starting point.

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

### +1 an issue

If an existing feature request or bug report is very important for you, please go ahead and :+1: it or leave a comment. We're always open to reprioritize our roadmap to make sure you're having the best possible DX.

### Requesting a new feature

We love your ideas for new features. If you're missing a certain feature, please feel free to [request a new feature here](https://github.com/graphcool/framework/issues/new). (Please make sure to check first if somebody else already requested it.)
