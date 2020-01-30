import dotenv from 'dotenv'
import Debug from 'debug'

import { PlotterTypeDefs, PlotterQueries, PlotterMutations } from './schema.js'
const debug = Debug('plotter:apollo-server')
dotenv.config()


// Connect to MongoDB

import mongoose from 'mongoose'

const url = ;

mongoose.connect(
  process.env.PLOTTER_DB_URL || 'mongodb://localhost:27017/plotterdb',
  { useNewUrlParser: true }
)

db.on('error', console.error.bind(console, 'connection error:'));

const resolvers = {
  PlotterPoint: {
    dates: () => {
      // return dates
      return 'turn this string into arrays of dates'
    }
  }
}

debug({ resolvers })

import apollo from 'apollo-server'
const { ApolloServer } = apollo

const server = new ApolloServer({
  typeDefs: [PlotterTypeDefs, PlotterQuery, PlotterMutations],
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
