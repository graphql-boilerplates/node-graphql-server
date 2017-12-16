import { GraphQLServer } from 'graphql-yoga'
import { importSchema } from 'graphql-import'
import { Graphcool } from 'graphcool-binding'
import { Context } from './utils'

const typeDefs = importSchema('./src/schema.graphql')
const resolvers = {
  Query: {
    feed(parent, args, ctx: Context, info) {
      return ctx.db.query.posts({ where: { isPublished: true } }, info)
    },
  },
  Mutation: {
    createDraft(parent, { title, text }, ctx: Context, info) {
      return ctx.db.mutation.createPost(
        // TODO remove `isPublished` in favour of default value
        { data: { title, text, isPublished: false } },
        info,
      )
    },
    publish(parent, { id }, ctx: Context, info) {
      return ctx.db.mutation.updatePost(
        {
          where: { id },
          data: { isPublished: true },
        },
        info,
      )
    },
  },
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: req => ({
    ...req,
    db: new Graphcool({
      schemaPath: './database/schema.graphql',
      endpoint: 'http://localhost:60000/api/graphql-boilerplate/dev',
      secret: 'your-graphcool-secret',
    }),
  }),
})

server.start(() => console.log('Server is running on http://localhost:4000'))
