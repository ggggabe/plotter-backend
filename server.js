import dotenv from 'dotenv'

import Debug from 'debug'
import apollo from 'apollo-server'
import gql from 'graphql-tag'
import fs from 'fs'
dotenv.config()

const debug = Debug('gm:apollo-server')
const typeDefs = gql`${fs.readFileSync(fs.realpathSync('.').concat('/schema.gql'), 'utf8')}`

// A map of functions which return data for the schema.
const resolvers = {
  PlotterPoint: {
    dates: () => {
      //return dates
      return 'turn this string into arrays of dates'
    }
  }
}

debug({ resolvers })

const { ApolloServer } = apollo
const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
