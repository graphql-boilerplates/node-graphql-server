import * as express from 'express'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import { graphqlExpress } from 'apollo-server-express'
import { transformSchema } from 'graphql-transform-schema'
import { makeRemoteExecutableSchema, mergeSchemas, introspectSchema } from 'graphql-tools'
import { HttpLink } from 'apollo-link-http'
import fetch from 'node-fetch'
import { expressPlayground } from 'graphql-playground-middleware'
import { request } from 'graphql-request'
import * as jwt from 'jsonwebtoken'

async function run() {

  // Step 1: Create local version of the CRUD API
  const link = new HttpLink({ uri: process.env.GRAPHQL_ENDPOINT, fetch })
  const graphcoolSchema = makeRemoteExecutableSchema({
    schema: await introspectSchema(link),
    link,
  })

  // Step 2: Define schema for the new API
  const extendTypeDefs = `
    extend type Query {
      viewer: Viewer!
    }

    type Viewer {
      me: User
      topPosts(limit: Int): [Post!]!
    }

    extend type Mutation {
      login(email: String!, password: String!): AuthPayload!
      signup(email: String!, password: String!): AuthPayload!
    }

    type AuthPayload {
      token: String
    }
  `

  // Step 3: Implement resolvers
  const mergedSchemas = mergeSchemas({
    schemas: [graphcoolSchema, extendTypeDefs],
    resolvers: mergeInfo => ({

      Query: {
        viewer: () => ({}),
      },

      Viewer: {

        async me(parent, args, context, info) {
          // get auth user id
          const token = context.req.get('Authorization').replace('Bearer ', '')
          const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }

          // check permission
          // const isValid = await graphcool.checkPermission(`{ SomeUserExists(filter: { id: "${userId}" }) }`)
          // if (!isValid) {
          //   throw new Error('User unauthenticated')
          // }

          return mergeInfo.delegate('query', 'User', { id: userId }, context, info)
        },

        topPosts(parent, { limit }, context, info) {
          return mergeInfo.delegate('query', 'allPosts', { first: limit }, context, info)
        },

      },

      Mutation: {
        async login(parent, { email, password }, context, info) {
          const token = await authUser(email, password)
          return { token }
        },

        async signup(parent, { email, password }, context, info) {
          const token = await signupUser(email, password)
          return { token }
        },
      },

    }),
  })

  // Step 4: Limit exposed operations from merged schemas 
  // Hide every root field except `viewer`
  const schema = transformSchema(mergedSchemas, {
    Query: {
      viewer: true,
      '*': false,
    },
    Mutation: {
      login: true,
      signup: true,
      '*': false,
    },
    User: {
      email: false,
      password: false,
    },
  })

  const app = express()

  app.use('/graphql', cors(), bodyParser.json(), graphqlExpress(req => ({ schema: schema, context: { req } })))
  app.use('/playground', expressPlayground({ endpoint: '/graphql' }))

  app.listen(3000, () => console.log('Server running. Open http://localhost:3000/playground to run queries.'))
}

run().catch(console.error.bind(console))

async function authUser(email: string, password: string): Promise<string> {
  const query = `query getUser($email: String!) {
    User(email: $email) {
      id
      password
    }
  }`
  const { User } = await request<any>(process.env.GRAPHQL_ENDPOINT!, query, { email })

  // TODO hash password with bcrypt
  if (User === null || User.password !== password) {
    throw new Error('Auth failed')
  }

  return jwt.sign({ userId: User.id }, process.env.JWT_SECRET!)
}

async function signupUser(email: string, password: string): Promise<string> {
  const query = `mutation newUser($email: String!, $password: String!) {
    User: createUser(email: $email, password: $password) {
      id
    }
  }`
  const { User } = await request<any>(process.env.GRAPHQL_ENDPOINT!, query, { email, password })

  return jwt.sign({ userId: User.id }, process.env.JWT_SECRET!)
}
