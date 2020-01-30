import { gql } from 'apollo-server'

export const PlotterTypes = gql`
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

type DateTime {
  day: Day
  timestamp: Date
}

type PlotterPoint {
  location: Coordinate!
  time: DateTime!
}

type PlotterData {
  points: [PlotterPoint]
}
`

export const PlotterQueries = gql`type Query{
  locations: [PlotterPoint]
  day(day: Day): [PlotterPoint]
  interval(start: Date!, end: Date!): [PlotterPoint]
}`

export const PlotterMutations = gql`type Mutation {
  addLocation(longitude: Float!, latitude: Float!, when: timestamp): PlotterPoint
}`
