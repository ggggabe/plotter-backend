import dotenv from 'dotenv'

import Debug from 'debug'
import apollo from 'apollo-server'
import gql from 'graphql-tag'
import fs from 'fs'

import { PlotterTypeDefs, PlotterQueries, PlotterMutations } from './schema.js'
dotenv.config()

const debug = Debug('plotter:apollo-server')

// A map of functions which return data for the schema.
const resolvers = {
  PlotterPoint: {
    dates: () => {
      // return dates
      return 'turn this string into arrays of dates'
    }
  }
}

debug({ resolvers })

const { ApolloServer } = apollo
const server = new ApolloServer({
  typeDefs: [PlotterTypeDefs, PlotterQuery, PlotterMutations],
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
