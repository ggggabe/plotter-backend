import Debug from 'debug'
import express from 'express'

const debug = Debug('plotter:router')

async function getLocationsByDay (query, client) {
  debug({
    query,
    client
  })

  return await client.getAllLocations()
}

export default dbClient => {
  const PlotterRouter = express.Router()
  PlotterRouter.use(express.json())
  debug({ dbClient })

  // :::: API :::::::::::::
  // ::::::::::::::::::::::
  // :::: GET REQUESTS ::::
  PlotterRouter.get('/locations', async ({ query }, res) => {
    debug({ query })

    res.send(await getLocationsByDay(
      query, dbClient
    ))
  })

  // :::: API :::::::::::::
  // ::::::::::::::::::::::
  // :::: POST REQUESTS :::
  PlotterRouter.post('/location', ({ body }, res) => {
    debug({ body })

    res.send('hello post')
  })

  return PlotterRouter
}
