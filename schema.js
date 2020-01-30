import gql from 'graphql-tag'

export const PlotterTypeDefs = gql`
type Coordinate {
  latitude: Float!
  longitude: Float!
}

enum Day {
  MONDAY
  TUESDAY
  WEDNESDAY
  THURSDAY
  FRIDAY
  SATURDAY
  SUNDAY
}

type Date {
  day: Day
  weirdTimestamp: Float
  timestamp: Int
}

type PlotterPoint {
  location: Coordinate!
  time: Date!
}

type PlotterData {
  points: [PlotterPoint]
}`

export const PlotterQueries = gql`
type Query{
  locations(start: Date, end: Date): [PlotterPoint]
  day(day: Day): [PlotterPoint]
  interval(start: Date!, end: Date!): [PlotterPoint]
}`

export const PlotterMutations = gql`
type Mutation {
  addLocation(longitude: Float!, latitude: Float!, when: Date): PlotterPoint
}`

export const PlotterResolvers = {
  Query: {
    locations:
  }
}
