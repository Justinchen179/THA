import mongoose from 'mongoose'

const accountSchema = mongoose.Schema({
  id: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    trim: true
  },
  level: {
    type: String,
    trim: true
  }
})

const accountSchemaDB = mongoose.model('accountSchema', accountSchema)
export default accountSchemaDB
