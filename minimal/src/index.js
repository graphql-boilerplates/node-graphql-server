const { GraphQLServer } = require('graphql-yoga')

const typeDefs = `
  type Query {
    hello(name: String): String
  }
`

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World!'}`,
  },
}

const server = new GraphQLServer({ typeDefs, resolvers, { port: 4000 } })
server.start(() => console.log(`Server is running at http://localhost:${opts.port}`))
