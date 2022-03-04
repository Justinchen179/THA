import express from 'express'
import albumRouter from './albumRouter.js'
import loginRouter from './loginRouter.js'
import dharmaRouter from './dharmRouter.js'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()
const indexRouter = express.Router()
const __dirname = path.resolve()
const mainViewPage = (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
}

indexRouter.get('/', mainViewPage)

indexRouter.use('/api/', albumRouter)
indexRouter.use('/api/', dharmaRouter)
indexRouter.use('/api/', loginRouter)

indexRouter.get('/*', mainViewPage)
export default indexRouter
