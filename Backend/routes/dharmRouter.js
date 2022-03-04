import express from 'express'
import formidable from 'formidable'
import dharmaDB from '../models/dharmaDBSchema.js'
import dotenv from 'dotenv'

dotenv.config()
const dharmaRouter = express.Router()

dharmaRouter.post('/Dharma', function (req, res) {
  const form = formidable({ multiples: true })
  form.parse(req, (err, inputData) => {
    if (err) {
      return
    }
    if (
      !inputData ||
      !inputData.content ||
      !inputData.type
    ) {
      return res.send({ status: false })
    } else {
      inputData.content = inputData.content.toString()
      inputData.type = inputData.type.toString()
    }

    if (inputData.content.length === 0 || inputData.type.length === 0) {
      res.send({ status: false })
    } else {
      dharmaDB(inputData)
        .save()
        .then(() => {
          res.send({ status: true })
        })
        .catch(() => {
          res.send({ status: false })
        })
    }
  })
})

dharmaRouter.get('/Dharma', function (req, res) {
  dharmaDB
    .find({})
    .then((dharmas) => {
      res.send(dharmas)
    })
    .catch(() => {
      res.send({ status: false })
    })
})

dharmaRouter.get('/Dharma/:id', function (req, res) {
  dharmaDB
    .findOne({ _id: req.params.id })
    .then((dharmas) => {
      if (dharmas === null) {
        return res.send({ status: false })
      }
      res.send(dharmas)
    })
    .catch(() => {
      res.send({ status: false })
    })
})

dharmaRouter.delete('/Dharma/:id', function (req, res) {
  const form = formidable({ multiples: true })
  form.parse(req, (err, inputData) => {
    if (err) {
      return
    }
    if (!inputData || !inputData.id) {
      return res.send({ status: false })
    } else {
      inputData.id = inputData.id.toString()
    }
    dharmaDB
      .deleteOne({ _id: inputData.id })
      .then(() => {
        res.send({ status: true })
      })
      .catch(() => {
        res.send({ status: false })
      })
  })
})
dharmaRouter.put('/Dharma/:id', function (req, res) {
  const form = formidable({ multiples: true })
  form.parse(req, (err, inputData) => {
    if (err) {
      return
    }
    if (
      !inputData ||
      !inputData.content ||
      !inputData.id ||
      !inputData.type
    ) {
      return res.send({ status: false })
    } else {
      inputData.content = inputData.content.toString()
      inputData.id = inputData.id.toString()
      inputData.type = inputData.type.toString()
    }
    if (
      inputData.content.length === 0 ||
      inputData.id.length === 0 ||
      inputData.type.length === 0
    ) {
      return res.send({ status: false })
    } else {
      dharmaDB
        .updateOne({ _id: inputData.id }, { content: inputData.content })
        .then(() => {
          dharmaDB
            .updateOne({ _id: inputData.id }, { type: inputData.type })
            .then(() => {
              console.log('update_type   id:', inputData.id)
            })
            .catch(() => {
              res.send({ status: false })
            })
          res.send({ status: true })
        })
        .catch(() => {
          res.send({ status: false })
        })
    }
  })
})

dharmaRouter.put('/Dharma', function (req, res) {
  const form = formidable({ multiples: true })
  form.parse(req, (err, inputData) => {
    if (err) {
      return
    }
    if (
      !inputData ||
      !inputData.content ||
      !inputData.type
    ) {
      return res.send({ status: false })
    } else {
      inputData.content = inputData.content.toString()
      inputData.type = inputData.type.toString()
    }
    if (inputData.content.length === 0 || inputData.type === 0) {
      return res.send({ status: false })
    } else {
      dharmaDB
        .findOne({ type: inputData.type })
        .then((dharma) => {
          if (dharma === null) {
            dharmaDB(inputData)
              .save()
              .then(() => {
                res.send({ status: true })
              })
              .catch(() => {
                res.send({ status: false })
              })
          } else {
            dharmaDB
              .updateOne(
                { type: inputData.type },
                { content: inputData.content }
              )
              .then(() => {
                res.send({ status: true })
              })
              .catch(() => {
                res.send({ status: false })
              })
          }
        })
        .catch(() => {
          res.send({ status: false })
        })
    }
  })
})

export default dharmaRouter
