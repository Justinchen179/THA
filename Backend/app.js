import express from 'express'
import session from 'express-session'
import routesindex from './routes/indexRouter.js'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import formidable from 'formidable'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'

dotenv.config()
const __dirname = path.resolve()
const JWT_PUBLIC_KEY = process.env.JWT_PUBLIC_KEY
const SESSION_SECRET_KEY = process.env.SESSION_SECRET_KEY
const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'build')))

const SESSION_CONFIG = {
  secret: SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 1000 }
}
app.use(session(SESSION_CONFIG))

const allowPath = ['/api']
const myLoggerMiddlware = function (req, res, next) {
  const form = formidable({ multiples: true })
  form.parse(req, (err, inputData) => {
    if (err) {
      return
    }
    const bearerHeader = req.headers.authorization
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ')
      const token = bearer[1]
      if (token) {
        try {
          jwt.verify(token, JWT_PUBLIC_KEY)
          req.session.isLogin = true
        } catch (err) {
          req.session.isLogin = false
        }
      }
    }
  })

  if (req.path.includes(allowPath)) {
    next()
  } else if (req.session.isLogin === true) {
    next()
  } else {
    res.redirect('/')
  }
}

app.use(myLoggerMiddlware)
app.use('/', routesindex)

export default app
