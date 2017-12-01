import { GraphQLServer } from 'graphql-yoga'
import { importSchema } from 'graphql-import'
import { Graphcool } from 'graphcool-orm'
import resolvers from './resolvers'

const typeDefs = importSchema('./src/schema.graphql')

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: req => ({
    ...req,
    db: new Graphcool({
      schema: 'schemas/db-service.graphql',
      endpoint: process.env.GRAPHCOOL_ENDPOINT,
      apikey: process.env.GRAPHCOOL_APIKEY,
    }),
  }),
})

server.start(() => console.log('Server is running on http://localhost:4000'))
