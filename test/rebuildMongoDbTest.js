import Debug from 'debug'
import locationsData from './data/locations.js'

import dotenv from 'dotenv'

import mongodb from 'mongodb'
const debug = Debug('test:mongoDbRebuild')
dotenv.config()
const { MongoClient } = mongodb

const { MONGO_IP } = process.env
const { MONGO_PORT } = process.env

if (!MONGO_IP || !MONGO_PORT) throw new Error('Please set .env MONGO_IP, MONGO_PORT')

async function rebuildTestDb () {
  const plotterdb = (await MongoClient.connect(`mongodb://${MONGO_IP}:${MONGO_PORT}`, {
    useUnifiedTopology: true
  })).db('plotterdb')

  const count = await plotterdb.collection('locations').count()

  if (count) {
    await plotterdb.collection('locations').drop()
  }

  await plotterdb.collection('locations').insertMany(locationsData)

  debug({
    count: await plotterdb.collection('locations').count(),
    locations: await plotterdb.collection('locations').find().toArray()
  })
}

rebuildTestDb()
