import mongoose from 'mongoose'
import dotenv from 'dotenv'
import app from './app.js'

dotenv.config()
const port = process.env.EXPRESS_PORT || 3000
const mongodbURI = process.env.MONGO_URI
const uri = `mongodb+srv://${mongodbURI}`

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection
  .on('open', () => {
    console.log('mongoose connection onpen')
  })
  .on('error', (err) => {
    console.log(` connection error:${err.message}`)
  })

const server = app.listen(port, () => {
  console.log(`server ${server.address().port}`)
})
