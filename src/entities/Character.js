import mongoose from 'mongoose'

const CharacterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  ilvl: {
    type: Number,
    required: true
  },
  isAlter: {
    type: Boolean,
    default: false
  },
  class: {
    type: String,
    required: true
  },
  guild: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guild'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  updateBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
}, { timestamps: true })

export default mongoose.model('Character', CharacterSchema)
