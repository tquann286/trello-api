import express from 'express'
import { connectDB } from '*/config/mongodb'
import { env } from '*/config/environment'

const app = express()

connectDB().catch(console.log)

app.get('/', (req, res) => {
  res.end('<h1>Hello World!</h1><hr/>')
})

app.listen(env.PORT, env.HOST, () => {
  console.log(`Hello, I'm running at ${env.HOST}:${env.PORT}/`)
})
