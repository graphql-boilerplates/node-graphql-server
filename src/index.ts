import { GraphQLServer } from 'graphql-yoga'
import { Remote, GraphcoolLink } from 'graphql-remote'
import { Query } from './resolvers/Query'
import { importSchema } from 'graphql-import'
import { Graphcool } from 'graphcool-orm'

import { auth } from './resolvers/Mutation/auth'
import { AuthPayload } from './resolvers/AuthPayload'
import { post } from './resolvers/Mutation/post'

const typeDefs = importSchema('./src/schema.graphql')
const resolvers = {
  Query,
  Mutation: {
    ...auth,
    ...post,
  },
  AuthPayload,
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: req => ({
    ...req,
    graphcool: new Graphcool({
      schema: 'schemas/db-service.graphql',
      endpoint: process.env.GRAPHCOOL_ENDPOINT,
      apikey: process.env.GRAPHCOOL_APIKEY,
    }),
  }),
})

server.start(() => console.log('Server is running on http://localhost:4000'))
