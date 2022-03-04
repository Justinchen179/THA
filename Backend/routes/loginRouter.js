import express from 'express'
import formidable from 'formidable'
import jwt from 'jsonwebtoken'
import accountSchemaDB from '../models/accountSchema.js'
import visitorCounterDB from '../models/visitorCounterSchema.js'
import dotenv from 'dotenv'

dotenv.config()
const JWT_PUBLIC_KEY = process.env.JWT_PUBLIC_KEY
const loginRouter = express.Router()
const TIMEOUTFORTOKEN = 60 * 100
const TIMEOUT = 1000 * 1000

loginRouter.get('/Logout', function (req, res) {
  const token = null
  res.cookie('token', token, { maxAge: 0, httpOnly: true })
  req.session.isLogin = false
  res.redirect('/')
})

loginRouter.get('/VisitorCounter', function (req, res) {
  visitorCounterDB.find({}).then((visitorCounterDB) => {
    res.send(visitorCounterDB[0])
  })
})

loginRouter.get('/addVisitorCounter', function (req, res) {
  visitorCounterDB.find({}).then((visitorCounterDBs) => {
    const number = visitorCounterDBs[0].times + 1
    console.log(number)
    return visitorCounterDB.updateOne({ _id: visitorCounterDBs[0]._id }, { times: number })
      .then(() => console.log(`TimesWatche: ${number}`))
  })
})

loginRouter.post('/TokenCheck', function (req, res) {
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
          res.send({ status: true })
        } catch (err) {
          req.session.isLogin = false
          res.send({ status: false })
        }
      } else {
        req.session.isLogin = false
        res.send({ status: false })
      }
    }
  })
})

loginRouter.post('/Login', function (req, res) {
  const form = formidable({ multiples: true })
  form.parse(req, (err, inputData) => {
    if (err) {
      return
    }
    accountSchemaDB
      .findOne({ id: inputData.id })
      .then((accountSchemaDBs) => {
        const loginIdChick = accountSchemaDBs.id
        const loginPasswordChick = accountSchemaDBs.password
        if (
          inputData.id === loginIdChick &&
          inputData.password === loginPasswordChick
        ) {
          const token = jwt.sign(
            {
              id: `${accountSchemaDBs.id}`,
              date: `${Date.now()}`
            },
            JWT_PUBLIC_KEY,
            { expiresIn: TIMEOUTFORTOKEN }
          )
          req.session.isLogin = true
          res.cookie('token', token, {
            maxAge: TIMEOUT * 1000,
            httpOnly: true
          })
          res.send({ status: true, token: token })
        } else {
          res.send({ status: false })
        }
      })
  })
})
export default loginRouter
