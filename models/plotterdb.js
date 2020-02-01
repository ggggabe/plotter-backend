import Debug from 'debug'
import dotenv from 'dotenv'
import mongodb from 'mongodb'
const debug = Debug('plotter:models:plotterdb')

dotenv.config()

class PlotterMongoClient {
  constructor() {
    const { MONGO_IP } = process.env
    const { MONGO_PORT } = process.env
    const { MONGO_PLOTTER_DB } = process.env
    debug({ MONGO_IP, MONGO_PORT, MONGO_PLOTTER_DB })

    if (!MONGO_IP || !MONGO_PORT || !MONGO_PLOTTER_DB) throw new Error('Please set .env MONGO_IP, MONGO_PORT, MONGO_PLOTTER_DB')

    this.path = `mongodb://${MONGO_IP}:${MONGO_PORT}/${MONGO_PLOTTER_DB}`
    debug({path: this.path})
  }

  async getConnectionPool() {
    await mongodb.connect(this.path, (err, database) => {
      if (err) throw err
      this.connectionPool = database
    })

    return this.connectionPool
  }

  hello () {
    debug('hello')
  }
}

export { PlotterMongoClient }
