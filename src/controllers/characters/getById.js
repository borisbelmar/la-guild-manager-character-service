import mongoose from 'mongoose'
import Character from '../../entities/Character.js'
import ServerError from '../../errors/ServerError.js'

const { ObjectId } = mongoose.Types

const getById = async ctx => {
  const { id } = ctx.params
  if (!ObjectId.isValid(id)) {
    throw new ServerError(404)
  }
  const data = await Character.findOne({
    _id: new ObjectId(id)
  }).populate('guild').exec()
  if (!data) {
    throw new ServerError(404)
  }
  ctx.body = data
}

export default getById
