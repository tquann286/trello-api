import express from 'express'
import cors from 'cors'
import { connectDB } from '*/config/mongodb'
import { env } from '*/config/environment'
import { apiV1 } from '*/routes/v1'


connectDB()
  .then(() => console.log('Connected successfully to database server!'))
  .then(() => bootServer())
  .catch(error => {
    console.error(error)
    process.exit(1)
  })

const bootServer = () => {
  const app = express()

  const WHITELIST_DOMAINS = ['http://localhost:3000','http://localhost:3001']
  const corsOptions = {
    origin: function (origin, callback) {
      if (WHITELIST_DOMAINS.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error(`${origin} not allowed by CORS`))
      }
    },
    optionsSuccessStatus: 200
  }

  // app.use(cors(corsOptions))
  app.use(cors())

  // Enable req.body data
  app.use(express.json())

  // Use APIs v1
  app.use('/v1', apiV1)
  
  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Hello, I'm running at ${env.APP_HOST}:${env.APP_PORT}/`)
  })
}