import dotenv from 'dotenv'
import Debug from 'debug'
import express from 'express'
import PlotterRouter from './PlotterRoutes.js'
import { PlotterMongoClient } from '../models/plotterdb.js'

dotenv.config()

const debug = Debug('plotter:express')
const server = express()
const port = process.env.PORT_PLOTTER || 420

async function init () {
  server.use(
    '/plotter',
    PlotterRouter(
      (new PlotterMongoClient()).getConnectionPool()
    )
  )

  server.listen(port, () => {
    debug(`Plotter server listening on port: ${port}`)
  })
}

init()
