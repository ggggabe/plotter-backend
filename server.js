import dotenv from 'dotenv'
import Debug from 'debug'

const debug = Debug('plotter:apollo-server')
dotenv.config()


// Connect to MongoDB

import apollo from 'apollo-server'
const { ApolloServer } = apollo
import { PlotterTypeDefs, PlotterQueries, PlotterMutations } from './schema.js'

const server = new ApolloServer({
  typeDefs: [
    PlotterTypeDefs,
    PlotterQueries,
    PlotterMutations
  ],
  resolvers: [
    PlotterResolvers
  ],
  context: ({ req, payload }) => ({
    ...req,
    mongoModels
  })
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
