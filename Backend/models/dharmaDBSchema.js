import mongoose from 'mongoose'

const DharmadbSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true
  },
  content: {
    type: String,
    trim: true
  },
  id: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    trim: true
  }
})

const DharmDB = mongoose.model('Dharma', DharmadbSchema)
export default DharmDB
