import dotenv from 'dotenv'
import fs from 'fs'
import AWS from 'aws-sdk'
import imagemin from 'imagemin'
import imageminJpegtran from 'imagemin-jpegtran'
import imageminPngquant from 'imagemin-pngquant'
import Jimp from 'jimp'

dotenv.config()

const TMP_DIR = '/tmp'
const S3_DB_NAME = process.env.S3_DB_NAME
const S3_LOCATION_CONSTRAINT = process.env.S3_LOCATION_CONSTRAINT
const S3_URI = process.env.S3_URI
const S3_IMAGE_URI = `${S3_URI}/image`

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ID,
  secretAccessKey: process.env.S3_ACCESS_KEY
})

const GetFileExt = (filename) => filename.split('.').pop()

const GetFileBasename = (filename) => {
  const content = filename.split('.')
  content.pop()
  return content.join()
}
const preprocessImage = (imageFilename) => {
  imagemin([`${TMP_DIR}/${imageFilename}`], {
    destination: `${TMP_DIR}/`,
    plugins: [
      imageminJpegtran(),
      imageminPngquant({
        quality: [0.6, 0.8]
      })
    ]
  })
}

const uploadFileToS3 = (newKey, newFilePath) => {
  const fileStream = fs.createReadStream(newFilePath)
  fileStream.on('error', function () { })
  s3.upload(
    {
      Bucket: `${S3_DB_NAME}`,
      Key: newKey,
      Body: fileStream,
      CreateBucketConfiguration: { LocationConstraint: `${S3_LOCATION_CONSTRAINT}` }
    }, function (err, data) {
      if (err) console.log(err, err.stack)
      else console.log('Bucket Created Successfully', data.Location)
    }
  )
}

export const uploadImageToS3 = (newFileName, newFilePath) => {
  const newKey = `image/${newFileName}`
  uploadFileToS3(newKey, newFilePath)
}

export const uploadDocToS3 = (newFileName, newFilePath) => {
  const newKey = `file/${newFileName}`
  uploadFileToS3(newKey, newFilePath)
}

export const pictureUploadProcess = (arr, items) => {
  const fileExt = GetFileExt(arr.name)
  const originFilePath = arr.path
  const originFileName = GetFileBasename(arr.name)

  let newFileName = Math.random().toString()
  newFileName = newFileName.replace(/0./, '')
  newFileName += `.${fileExt}`
  const newFilePath = `${TMP_DIR}/${newFileName}`

  fs.renameSync(originFilePath, newFilePath)
  preprocessImage(newFilePath)
  uploadImageToS3(newFileName, newFilePath)

  items.push({
    path: newFilePath,
    filename: newFileName,
    content: originFileName
  })
}

export const sliderUploadProcess = (arr, items) => {
  const fileExt = GetFileExt(arr.name)
  const originFilePath = arr.path
  const originFileName = GetFileBasename(arr.name)

  let newFileName = Math.random().toString()
  newFileName = newFileName.replace(/0./, '')
  newFileName += `.${fileExt}`
  const newFilePath = `${TMP_DIR}/${newFileName}`

  fs.renameSync(originFilePath, newFilePath)
  uploadImageToS3(newFileName, newFilePath)

  items.push({
    path: newFilePath,
    filename: newFileName,
    content: originFileName
  })
}

const uploadBufferToS3 = (newCoverFileName, buffer) => {
  s3.upload(
    {
      Bucket: `${S3_DB_NAME}`,
      Key: `image/${newCoverFileName}`,
      Body: buffer,
      CreateBucketConfiguration: { LocationConstraint: `${S3_LOCATION_CONSTRAINT}` }
    }, function (err, data) {
      if (err) console.log(err, err.stack)
      else console.log('Bucket Created Successfully', data.Location)
    }
  )
}

const cropPicture = (path, newCoverFileName, type) => {
  let [cropSizeW, cropSizeH] = [300, 300]
  if (type === 'HOME') [cropSizeW, cropSizeH] = [700, 700]
  else if (type === 'SLIDER') [cropSizeW, cropSizeH] = [1200, 500]

  Jimp.read(path, (err, image) => {
    if (err) throw err
    image.cover(cropSizeW, cropSizeH).getBuffer(Jimp.AUTO, (err, buffer) => {
      if (err) throw err
      uploadBufferToS3(newCoverFileName, buffer)
    })
  })
}

export const cropCoverPicture = (path, newCoverFileName) => {
  cropPicture(path, newCoverFileName, 'ALBUM')
}

export const cropHomeCoverPicture = (path, newCoverFileName) => {
  cropPicture(path, newCoverFileName, 'HOME')
}

export const cropSliderPicture = (path, newCoverFileName) => {
  cropPicture(path, newCoverFileName, 'SLIDER')
}

export const delPictureProcess = (imageKey) => {
  s3.deleteObject(
    {
      Bucket: `${S3_DB_NAME}`,
      Key: `image/${imageKey}`
    }
  )
}

export const delDocProcess = (fileKey) => {
  s3.deleteObject(
    {
      Bucket: `${S3_DB_NAME}`,
      Key: `file/${fileKey}`
    }
  )
}

export const cropCoverPictureAreaChange = (
  editPicturePath,
  x,
  y,
  width,
  hight,
  isAlbumCover = false,
  cropType
) => {
  Jimp.read(`${S3_IMAGE_URI}/${editPicturePath}`, (err, image) => {
    const pictureQuality = (cropType === 'albumPictureCrop') ? 60 : 100
    let [resizeX, resizeY] = [1200, 500]
    if (cropType === 'albumPictureCrop') [resizeX, resizeY] = [300, 300]
    if (isAlbumCover) [resizeX, resizeY] = [700, 700]

    if (err) throw err
    image
      .crop(x, y, width, hight)
      .resize(resizeX, resizeY)
      .quality(pictureQuality)
      .getBuffer(Jimp.AUTO, (err, buffer) => {
        if (err) throw err
        s3.upload(
          {
            Bucket: `${S3_DB_NAME}`,
            Key: `image/${isAlbumCover ? 'HomeCover' : 'cover'
              }+${editPicturePath}`,
            Body: buffer,
            CreateBucketConfiguration: { LocationConstraint: `${S3_LOCATION_CONSTRAINT}` }
          }, function (err, data) {
            if (err) console.log(err, err.stack)
            else console.log('Bucket Created Successfully', data.Location)
          }
        )
      })
  })
}

export const uploadDocProcess = (arr, items) => {
  const fileExt = GetFileExt(arr.name)
  const originFilePath = arr.path
  let originFileName = GetFileBasename(arr.name)
  originFileName += `.${fileExt}`

  let newFileName = Math.random().toString()
  newFileName = newFileName.replace(/0./, '')
  newFileName += `.${fileExt}`
  const newFilePath = `${TMP_DIR}/${newFileName}`

  fs.renameSync(originFilePath, newFilePath)
  uploadDocToS3(newFileName, newFilePath)

  items.push({
    path: newFileName,
    content: originFileName,
    hidden: false
  })
}
