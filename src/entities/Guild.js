import mongoose from 'mongoose'

const GuildSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
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

export default mongoose.model('Guild', GuildSchema)
