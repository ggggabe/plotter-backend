import Debug from 'debug'
import express from 'express'

const debug = Debug('plotter:router')

export default DbClient => {
  const PlotterRouter = express.Router()
  PlotterRouter.use(express.json())

  // Get all locations
  PlotterRouter.get('/locations', ({ query }, res) => {
    debug({ query })

    res.send('/locations')
  })

  // add a new location
  PlotterRouter.post('/location', ({ body }, res) => {
    debug({ body })

    res.send('hello post')
  })

  return PlotterRouter
}
