import mongoose from 'mongoose'
import Character from '../../entities/Character.js'
import ServerError from '../../errors/ServerError.js'

const { ObjectId } = mongoose.Types

const deleteOne = async ctx => {
  const { id } = ctx.params
  if (!ObjectId.isValid(id)) {
    throw new ServerError(404)
  }
  const character = await Character.deleteOne({
    _id: new ObjectId(id)
  })
  ctx.body = character
}

export default deleteOne
