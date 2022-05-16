import mongoose from 'mongoose'
import Guild from '../../entities/Guild.js'
import ServerError from '../../errors/ServerError.js'

const { ObjectId } = mongoose.Types

const getById = async ctx => {
  const { id } = ctx.params
  if (!ObjectId.isValid(id)) {
    throw new ServerError(404)
  }
  const data = await Guild.findById(id)
  if (!data) {
    throw new ServerError(404)
  }
  ctx.body = data
}

export default getById
