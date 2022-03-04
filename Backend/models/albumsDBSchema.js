import mongoose from 'mongoose'

const AlbumsdbSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true
  },
  content: {
    type: String
  },
  millisecond: {
    type: Number,
    trim: true
  },
  type: {
    type: String,
    trim: true
  },
  hidden: {
    type: Boolean,
    trim: true
  },
  id: {
    type: String,
    trim: true
  },
  coverPicture: {
    type: String,
    trim: true
  },
  pictures: [
    {
      path: { type: String },
      content: { type: String },
      hidden: { type: Boolean },
      showIndex: { type: Number }
    }
  ],
  file: [
    {
      path: { type: String },
      content: { type: String },
      hidden: { type: Boolean }
    }
  ]
})

const AlbumsDB = mongoose.model('Album', AlbumsdbSchema)
export default AlbumsDB
