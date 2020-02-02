import dotenv from 'dotenv'
import Debug from 'debug'
import express from 'express'
import PlotterRouter from './PlotterRoutes.js'
import { PlotterMongoClient } from '../models/PlotterMongoClient.js'

dotenv.config()

const debug = Debug('plotter:express')
const server = express()
const port = process.env.PORT_PLOTTER || 420

async function init () {
  const plotterDbClient = await new PlotterMongoClient()

  server.use(
    '/plotter',
    PlotterRouter(await plotterDbClient.getConnectionPool())
  )

  server.listen(port, () => {
    debug(`Plotter server listening on port: ${port}`)
  })
}

init()
