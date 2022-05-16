import mongoose from 'mongoose'
import Guild from '../../entities/Guild.js'
import ServerError from '../../errors/ServerError.js'

const { ObjectId } = mongoose.Types

const deleteOne = async ctx => {
  const { id } = ctx.params
  if (!ObjectId.isValid(id)) {
    throw new ServerError(404)
  }
  const data = await Guild.deleteOne({
    _id: new ObjectId(id)
  })
  ctx.body = data
}

export default deleteOne
