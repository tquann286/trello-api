import express from 'express'
import { connectDB } from '*/config/mongodb'
import { env } from '*/config/environment'

const app = express()

connectDB().catch(console.log)

app.get('/', (req, res) => {
  res.end('<h1>Hello World!</h1><hr/>')
})

app.listen(env.APP_PORT, env.APP_HOST, () => {
  console.log(`Hello, I'm running at ${env.APP_HOST}:${env.APP_PORT}/`)
})
