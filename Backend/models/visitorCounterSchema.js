import mongoose from 'mongoose'

const visitorCounterDBSchema = mongoose.Schema({
  times: {
    type: Number,
    trim: true
  }
})

const DharmDB = mongoose.model('visitorCounter', visitorCounterDBSchema)
export default DharmDB
