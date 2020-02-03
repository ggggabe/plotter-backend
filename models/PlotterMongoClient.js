import Debug from 'debug'
import dotenv from 'dotenv'
import mongodb from 'mongodb'
const debug = Debug('plotter:models:plotterdb')

dotenv.config()
const { MongoClient } = mongodb

class PlotterMongoClient {
  async getConnectionPool () {
    await MongoClient.connect(this.makeMongoUrl(), {
      poolSize: 10,
      useUnifiedTopology: true
    }, (e, client) => {
      if (e) throw e
      this.db = client.db(process.env.MONGO_PLOTTER_DB)
    })

    return this
  }

  async getAllLocations () {
    if (!this.db) await this.getConnectionPool()

    const collection = await this.useCollection('locations')
    const locations = await collection.find().sort('time', 1).toArray()

    return locations
  }

  async showCollections () {
    if (!this.db) await this.getConnectionPool()

    this.db.listCollections({}).toArray((err, collections) => {
      if (err) throw err
      debug({ collections })
    })
  }

  async addLocation (locationDoc) {
    const locations = await this.useLocations()
    const result = await locations.insert(locationDoc)
    const newDoc = await locations.find({ _id: result.insertedIds[0] }).toArray()

    return newDoc
  }

  // :::: UNDER CONSTRUCTION ::::
  async useLocations () {
    return this.useCollection('locations')
  }

  async useCollection (c) {
    if (!this.db) await this.getConnectionPool()

    return this.db.collection(c)
  }

  makeMongoUrl () {
    const { MONGO_IP } = process.env
    const { MONGO_PORT } = process.env
    debug({ MONGO_IP, MONGO_PORT })

    if (!MONGO_IP || !MONGO_PORT) throw new Error('Please set .env MONGO_IP, MONGO_PORT')

    return `mongodb://${MONGO_IP}:${MONGO_PORT}`
  }
}

export { PlotterMongoClient }
