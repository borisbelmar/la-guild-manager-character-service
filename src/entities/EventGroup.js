import mongoose from 'mongoose'

const EventGroupSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  type: {
    type: String,
    required: true
  },
  startAt: {
    type: Date,
    required: true
  },
  open: {
    type: Boolean,
    default: true
  },
  characters: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Character',
    default: []
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

export default mongoose.model('EventGroup', EventGroupSchema)
