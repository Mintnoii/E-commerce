import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Yantai = new Schema({
  count:{
    type: Number,
  },
  pois: {
    type: Array,
  },
})

export default mongoose.model('Yantai', Yantai)
