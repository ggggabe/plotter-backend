import Debug from 'debug'
import express from 'express'

const debug = Debug('plotter:router')

async function getLocationsByDay (query, client) {
  debug({
    query,
    client
  })

  return client.getAllLocations()
}

async function addLocation (locationObj, client) {
  const fields = ['longitude', 'latitude', 'time']
  const missing = fields.filter(key => locationObj[key] === undefined)

  if (missing.length) {
    throw new Exception(`missing fields: ${missing.join(', ')}`)
  }

  const request = {}
  const {
    latitude,
    longitude,
    time
  } = locationObj

  return client.addLocation({ latitude, longitude, time })
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

    res.send(await getLocationsByDay(query, dbClient))
  })

  // :::: API :::::::::::::
  // ::::::::::::::::::::::
  // :::: POST REQUESTS :::

  PlotterRouter.post('/location', async ({ body: locationObj }, res) => {
    debug({ locationObj })

    res.send(await addLocation(locationObj, dbClient))
  })

  return PlotterRouter
}
