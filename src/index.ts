import * as express from 'express'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import expressPlayground from 'graphql-playground-middleware-express'
import { graphqlExpress } from 'apollo-server-express'
import * as morgan from 'morgan'
import { HttpLink } from 'apollo-link-http'
import fetch from 'node-fetch'
import { Stack } from 'graphql-stack'
import { me } from './resolvers/Query/me'
import { login } from './resolvers/Mutation/login'
import { signup } from './resolvers/Mutation/signup'
import { beforeAfterHook } from './middlewares/beforeAfterHook'
import { authMiddleware } from './middlewares/authMiddleware'
import { hasCoolFriend } from './middlewares/hasCoolFriend'
import { friendsPosts } from './resolvers/Viewer/friendsPosts'
import { nonSecretPosts } from './resolvers/Viewer/nonSecretPosts'
import { Delegate } from 'graphql-delegate'

async function run() {
  const app = express()
  const link = new HttpLink({
    uri: process.env.GRAPHQL_ENDPOINT,
    fetch,
    headers: { Authorization: `Bearer ${process.env.ADMIN_TOKEN}` },
  })
  const delegate = new Delegate(link)
  // initializes the remote schema
  await delegate.init()

  const typeDefs = `
    type Query {
      viewer: Viewer!
    }

    type Viewer {
      me: User
      friendsPosts(limit: Int): [Post!]!
      nonSecretPosts(limit: Int): [Post!]!
    }

    type Mutation {
      login(email: String!, password: String!): AuthPayload!
      signup(email: String!, password: String!): AuthPayload!
    }

    type AuthPayload {
      token: String
    }
  `
  const allTypes = delegate.extractMissingTypes(typeDefs)

  const stack = new Stack({ typeDefs: allTypes })

  // middlewares can be added here
  // app.use(caching())
  // app.use(metrics())
  stack.use({
    Query: {
      viewer: authMiddleware,
    },
    Viewer: {
      me: me,
      friendsPosts: [hasCoolFriend('David'), beforeAfterHook, friendsPosts],
      nonSecretPosts: [beforeAfterHook, nonSecretPosts],
    },
    Mutation: {
      login,
      signup,
    },
  })

  const schema = stack.getSchema()

  app.use(
    '/graphql',
    cors(),
    bodyParser.json(),
    graphqlExpress(req => ({ schema, context: { req, delegate: delegate.getDelegator() } })),
  )
  app.use(morgan('tiny'))
  app.use('/playground', expressPlayground({ endpoint: '/graphql' }))
  app.listen(3000, () =>
    console.log(
      'Server running. Open http://localhost:3000/playground to run queries.',
    ),
  )
}

run().catch(console.error.bind(console))
