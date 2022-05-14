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
  minIlvl: {
    type: Number,
    required: true
  },
  dpsCount: {
    type: Number,
    default: 0
  },
  supportCount: {
    type: Number,
    default: 0
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
