import { GraphQLServer } from 'graphql-yoga'
import { importSchema } from 'graphql-import'
import { Graphcool } from 'graphcool-binding'
import resolvers from './resolvers'

const typeDefs = importSchema('./src/schema.graphql')

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: req => ({
    ...req,
    db: new Graphcool({
      schemaPath: './database/schema.graphql',
      endpoint: process.env.GRAPHCOOL_ENDPOINT,
      secret: process.env.GRAPHCOOL_SECRET,
    }),
  }),
})

server.start(() => console.log('Server is running on http://localhost:4000'))
