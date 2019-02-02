const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (root, args, context, info) => {
      return context.prisma.links()
    },
    link: (id, args, context) => {
      return context.prisma.links()
    }
  },
  Mutation: {
    post: (parent, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description,
      })
    },
    updateLink: (parent, args, context) => {
      return context.prisma.updateLink({
        description: args.description,
        url: args.url,
      }, { id: args.id })
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma }
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
