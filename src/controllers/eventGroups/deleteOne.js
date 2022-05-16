import mongoose from 'mongoose'
import EventGroup from '../../entities/EventGroup.js'

const { ObjectId } = mongoose.Types

const deleteOne = async ctx => {
  const { id } = ctx.params
  const data = await EventGroup.deleteOne({
    _id: new ObjectId(id)
  })
  ctx.body = data
}

export default deleteOne
