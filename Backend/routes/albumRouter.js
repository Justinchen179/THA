import express from 'express'
import formidable from 'formidable'
import albumsDB from '../models/albumsDBSchema.js'
import dotenv from 'dotenv'
import * as tool from '../models/tool.js'

dotenv.config()
const S3_URI = process.env.S3_URI
const albumRouter = express.Router()

albumRouter.get('/Albums', function (req, res) {
  albumsDB
    .find({ hidden: false })
    .then((albumDB) => {
      const albumDBs = albumDB
      for (const i in albumDBs) {
        const notokenPicture = albumDBs[i].pictures.filter(
          (e) => e.hidden === false
        )
        albumDBs[i].pictures = notokenPicture
        const notokenFile = albumDBs[i].file.filter((e) => e.hidden === false)
        albumDBs[i].file = notokenFile
      }
      res.send(albumDBs)
    })
    .catch(() => {
      res.send({ status: false })
    })
})

albumRouter.get('/Albums/:id', function (req, res) {
  albumsDB
    .findOne({ _id: req.params.id })
    .then((albums) => {
      const notoken = albums.pictures.filter((e) => e.hidden === false)
      const notokenFile = albums.file.filter((e) => e.hidden === false)
      albums.pictures = notoken
      albums.file = notokenFile
      if (albums.hidden === true) {
        res.send({ status: false })
      } else {
        res.send(albums)
      }
    })
    .catch(() => {
      res.send({ status: false })
    })
})

albumRouter.put('/Albums/:id', function (req, res) {
  const form = formidable({ multiples: true })
  form.parse(req, (err, inputData, inputFiles) => {
    if (err) {
      return
    }
    if (
      !inputData ||
      !inputData.id
    ) {
      return res.send({ status: false })
    } else {
      inputData.id = inputData.id.toString()
    }
    const namearry = []

    if (inputFiles.albumFile) {
      if (inputFiles.albumFile) {
        const isFileUploadSuccess = inputFiles.albumFile.size !== 0
        if (inputData.actionType !== 'editSliderAlbum') {
          if (isFileUploadSuccess) {
            const isMultiFiles = inputFiles.albumFile.length > 0

            if (isMultiFiles) {
              inputFiles.albumFile.forEach((arr) => {
                tool.pictureUploadProcess(arr, namearry)
              })
            } else {
              const arr = inputFiles.albumFile
              tool.pictureUploadProcess(arr, namearry)
            }
          }
          for (const i in namearry) {
            const item = namearry[i]
            const newCoverFileName = `cover+${item.filename}`
            tool.cropCoverPicture(item.path, newCoverFileName)
            albumsDB
              .updateOne(
                { _id: inputData.id },
                {
                  $push: {
                    pictures: {
                      path: item.filename,
                      content: item.content,
                      hidden: 'false'
                    }
                  }
                }
              )
              .then(() => console.log('path   id:', inputData.id))
          }
        } else if (inputData.actionType === 'editSliderAlbum') {
          if (isFileUploadSuccess) {
            const isMultiFiles = inputFiles.albumFile.length > 0
            if (isMultiFiles) {
              inputFiles.albumFile.forEach((arr) => {
                tool.sliderUploadProcess(arr, namearry)
              })
            } else {
              const arr = inputFiles.albumFile
              tool.sliderUploadProcess(arr, namearry)
            }
          }
          for (const i in namearry) {
            const item = namearry[i]
            const newCoverFileName = `cover+${item.filename}`
            tool.cropSliderPicture(item.path, newCoverFileName)
            albumsDB
              .updateOne(
                { _id: inputData.id },
                {
                  $push: {
                    pictures: {
                      path: item.filename,
                      content: item.content,
                      hidden: 'false'
                    }
                  }
                }
              )
              .then(() => console.log('path   id:', inputData.id))
          }
        }
      }
      albumsDB.findOne({ _id: inputData.id }).then((albums) => {
        if (
          albums &&
          albums.coverPicture === '/' &&
          namearry.length !== 0 &&
          inputData.actionType !== 'editSliderAlbum'
        ) {
          const path = 'cover+' + inputData.path[0].path
          albumsDB
            .updateOne({ _id: inputData.id }, { coverPicture: path })
            .then(() => console.log('update_coverPicture   id:', inputData.id))
        }
      })
    }
    if (inputFiles.downloadFile) {
      const isFileUploadSuccess = inputFiles.downloadFile.size !== 0
      if (isFileUploadSuccess) {
        const isMultiFiles = inputFiles.downloadFile.length > 0
        const fileNameArr = []
        if (isMultiFiles) {
          inputFiles.downloadFile.forEach((arr) => {
            tool.uploadDocProcess(arr, fileNameArr)
          })
        } else {
          const arr = inputFiles.downloadFile
          tool.uploadDocProcess(arr, fileNameArr)
        }
        for (const i in fileNameArr) {
          const item = fileNameArr[i]
          albumsDB
            .updateOne(
              { _id: inputData.id },
              {
                $push: {
                  file: {
                    path: item.path,
                    content: item.content,
                    hidden: 'false'
                  }
                }
              }
            )
            .then(() => console.log('path   id:', inputData.id))
        }
      }
    }
    let errindex = 0
    if (inputData.fileHiddenId) {
      inputData.fileHiddenId = inputData.fileHiddenId.toString()
      if (inputData.fileHidden === 'true' || inputData.fileHidden === 'false') {
        albumsDB
          .updateOne(
            { 'file._id': inputData.fileHiddenId },
            { $set: { 'file.$.hidden': inputData.fileHidden === 'false' } }
          )
          .then(() =>
            console.log(
              `update_hiddenChange  ${inputData.fileHidden} id:`,
              inputData.fileHiddenId
            )
          )
          .catch(() => {
            errindex++
            res.send({ status: false })
          })
      } else {
        errindex++
        res.send({ status: false })
      }
    }
    if (inputData.hidden) {
      inputData.hidden = inputData.hidden.toString()
      if (inputData.hidden === 'true' || inputData.hidden === 'false') {
        albumsDB
          .updateOne({ _id: inputData.id }, { hidden: inputData.hidden })
          .then(() => console.log('update_hidden   id:', inputData.id))
          .catch(() => {
            errindex++
            res.send({ status: false })
          })
      } else {
        errindex++
        res.send({ status: false })
      }
    }
    if (inputData.albumTitle) {
      if (inputData.albumTitle.length !== 0) {
        albumsDB
          .updateOne({ _id: inputData.id }, { title: inputData.albumTitle })
          .then(() => console.log('update_title   id:', inputData.id))
          .catch(() => {
            errindex++
            res.send({ status: false })
          })
      } else {
        errindex++
        res.send({ status: false })
      }
    }

    if (inputData.albumContent) {
      if (inputData.albumContent.length !== 0) {
        albumsDB
          .updateOne({ _id: inputData.id }, { content: inputData.albumContent })
          .then(() => console.log('update_content id:', inputData.id))
          .catch(() => {
            errindex++
            res.send({ status: false })
          })
      } else {
        errindex++
        res.send({ status: false })
      }
    }
    if (inputData.editPictureId && !inputData.editPicturePath) {
      inputData.editPictureId = inputData.editPictureId.toString()
      inputData.pictureContent = inputData.pictureContent.toString()
      if (inputData.pictureContent.length !== 0) {
        albumsDB
          .updateOne(
            { 'pictures._id': inputData.editPictureId },
            { $set: { 'pictures.$.content': inputData.pictureContent } }
          )
          .then(() =>
            console.log('update_editPictureId   id:', inputData.editPictureId)
          )
          .catch(() => {
            errindex++
            res.send({ status: false })
          })
      } else {
        errindex++
        res.send({ status: false })
      }
    }
    let deletePictureID = inputData.deletePictureID
    if (deletePictureID && deletePictureID.length !== 0) {
      deletePictureID = deletePictureID.toString()
      const deletePicturePath = inputData.deletePicturePath.toString()
      albumsDB
        .updateOne(
          { _id: inputData.id },
          { $pull: { pictures: { _id: deletePictureID } } }
        )
        .then(() => {
          tool.delPictureProcess(`${deletePicturePath}`)
          tool.delPictureProcess(`cover+${deletePicturePath}`)
        })
        .catch(() => {
          errindex++
          res.send({ status: false })
        })
    }
    if (inputData.deleteFilePath && inputData.deleteFilePath.length !== 0) {
      const deleteFilePath = inputData.deleteFilePath.toString()
      albumsDB
        .updateOne(
          { _id: inputData.id },
          { $pull: { file: { path: deleteFilePath } } }
        )
        .then(() => {
          tool.delDocProcess(`${deleteFilePath}`)
        })
        .catch(() => {
          errindex++
          res.send({ status: false })
        })
    }

    if (
      inputData.cropX ||
      inputData.cropY ||
      inputData.cropWidth ||
      inputData.cropHight
    ) {
      const x = parseInt(inputData.cropX)
      const y = parseInt(inputData.cropY)
      const width = parseInt(inputData.cropWidth)
      const hight = parseInt(inputData.cropHight)
      const cropType = inputData.actionType
      inputData.editPicturePath = inputData.editPicturePath.toString()
      albumsDB
        .findOne({ 'pictures._id': inputData.id })
        .then((albumsDB) => {
          const albumCover = albumsDB.coverPicture === inputData.editPicturePath
          if (albumCover) {
            tool.cropCoverPictureAreaChange(
              inputData.editPicturePath,
              x,
              y,
              width,
              hight,
              albumCover,
              cropType
            )
          }
        })
      tool.cropCoverPictureAreaChange(
        inputData.editPicturePath,
        x,
        y,
        width,
        hight,
        false,
        cropType
      )
    }

    if (inputData.pictureHiddenId) {
      const pictureHiddenId = inputData.pictureHiddenId.toString()
      const pictureHidden = inputData.pictureHidden.toString()
      if (pictureHidden === 'true' || pictureHidden === 'false') {
        albumsDB
          .updateOne(
            { 'pictures._id': pictureHiddenId },
            { $set: { 'pictures.$.hidden': pictureHidden } }
          )
          .then(() =>
            console.log('update_pictureHiddenId   id:', pictureHiddenId)
          )
          .catch(() => {
            errindex++
            res.send({ status: false })
          })
      } else {
        errindex++
        res.send({ status: false })
      }
    }
    if (inputData.newCoverPicture) {
      inputData.newCoverPicture = inputData.newCoverPicture.toString()
      albumsDB
        .updateOne(
          { _id: inputData.id },
          { coverPicture: inputData.newCoverPicture }
        )
        .then(() => {
          tool.delPictureProcess(`HomeCover+${inputData.oldPicturePath}`)
          tool.cropHomeCoverPicture(
            `${S3_URI}/image/${inputData.newCoverPicture}`,
            `HomeCover+${inputData.newCoverPicture}`
          )
        })
        .catch(() => {
          errindex++
          res.send({ status: false })
        })
    }
    if (errindex === 0) res.send({ status: true })
  })
})

albumRouter.delete('/Albums/:id', function (req, res) {
  const form = formidable({ multiples: true })
  form.parse(req, (err, inputData) => {
    if (err) {
      return { status: false }
    }
    if (
      !inputData ||
      !inputData.id
    ) {
      return res.send({ status: false })
    } else {
      inputData.id = inputData.id.toString()
    }
    if (req.params.id.length === 0) {
      res.send({ status: false })
    } else {
      albumsDB.findOne({ _id: req.params.id }).then((albumsDB) => {
        if (albumsDB) {
          for (const i in albumsDB.pictures) {
            tool.delPictureProcess(`${albumsDB.pictures[i].path}`)
            tool.delPictureProcess(`cover+${albumsDB.pictures[i].path}`)
          }
          for (const i in albumsDB.file) {
            tool.delDocProcess(`${albumsDB.file[i].path}`)
          }
        }
      })
      albumsDB
        .deleteOne({ _id: req.params.id })
        .then(() => {
          res.send({ status: true })
        })
        .catch(() => {
          res.send({ status: false })
        })
    }
  })
})

albumRouter.post('/Albums/:id', function (req, res) {
  const form = formidable({ multiples: true })
  form.parse(req, (err, inputData) => {
    if (err) {
      return { status: false }
    }
    if (
      !inputData ||
      !inputData.id
    ) {
      return res.send({ status: false })
    } else {
      inputData.id = inputData.id.toString()
    }
    if (inputData.actionType !== 'getSliderAlbumPicture') {
      albumsDB
        .findOne({ _id: inputData.id })
        .then((Album) => {
          if (inputData.pictureId) {
            const picturedate = Album.pictures.filter(
              (e) => e._id.toString() === inputData.pictureId.toString()
            )
            res.send(picturedate)
          } else {
            res.send(Album)
          }
        })
        .catch(() => {
          res.send({ status: false })
        })
    }
    if (inputData.actionType === 'getSliderAlbumPicture') {
      albumsDB
        .findOne({ 'pictures._id': inputData.id })
        .then((Album) => {
          const picturedate = Album.pictures.filter(
            (e) => e._id.toString() === inputData.id.toString()
          )
          res.send(picturedate)
        })
        .catch(() => {
          res.send({ status: false })
        })
    }
  })
})

albumRouter.post('/Albums', function (req, res) {
  const form = formidable({ multiples: true })
  form.parse(req, (err, inputData, inputFiles) => {
    if (err) {
      return
    }
    if (
      !inputData ||
      !inputData.actionType
    ) {
      return res.send({ status: false })
    } else {
      inputData.actionType = inputData.actionType.toString()
    }

    if (inputData.actionType === 'getAlbumByManager') {
      albumsDB
        .find({})
        .then((albumsDB) => {
          const albumsDBs = albumsDB.filter(
            (e) => e.type.toString() === inputData.albumType
          )
          res.send(albumsDBs)
        })
        .catch(() => {
          res.send({ status: false })
        })
    }

    if (inputData.actionType === 'getAlbumSliderByManager') {
      albumsDB
        .findOne({ type: 'sliderAlbum' })
        .then((albumsDBs) => {
          res.send(albumsDBs)
        })
        .catch(() => {
          res.send({ status: false })
        })
    }

    if (inputData.actionType === 'createAlbum') {
      const namearry = []
      if (inputFiles.albumFile) {
        const isFileUploadSuccess = inputFiles.albumFile.size !== 0
        if (isFileUploadSuccess) {
          const isMultiFiles = inputFiles.albumFile.length > 0
          if (isMultiFiles) {
            inputFiles.albumFile.forEach((arr) => {
              tool.pictureUploadProcess(arr, namearry)
            })
          } else {
            const arr = inputFiles.albumFile
            tool.pictureUploadProcess(arr, namearry)
          }
          inputData.pictures = []
          for (const i in namearry) {
            const item = namearry[i]
            inputData.pictures[i] = {
              path: item.filename,
              content: item.content,
              hidden: 'false'
            }
            const newCoverFileName = `cover+${item.filename}`
            tool.cropCoverPicture(item.path, newCoverFileName)
            if (i === '0') {
              const newHomeCoverName = item.filename
              tool.cropHomeCoverPicture(
                item.path,
                `HomeCover+${newHomeCoverName}`
              )
            }
          }
          if (inputData.pictures[0]) inputData.coverPicture = inputData.pictures[0].path
        }
      }
      if (inputFiles.downloadFile) {
        const isFileUploadSuccess = inputFiles.downloadFile.size !== 0
        if (isFileUploadSuccess) {
          const isMultiFiles = inputFiles.downloadFile.length > 0
          inputData.file = []
          if (isMultiFiles) {
            inputFiles.downloadFile.forEach((arr) => {
              tool.uploadDocProcess(arr, inputData.file)
            })
          } else {
            const arr = inputFiles.downloadFile
            tool.uploadDocProcess(arr, inputData.file)
          }
        }
      }
      inputData.millisecond = Date.now()
      albumsDB(inputData)
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

export default albumRouter
