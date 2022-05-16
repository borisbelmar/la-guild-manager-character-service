import mongoose from 'mongoose'
import EventGroup from '../../entities/EventGroup.js'
import ServerError from '../../errors/ServerError.js'
import getCharactersByRole from '../../utils/getCharactersByRole.js'

const { ObjectId } = mongoose.Types

const getById = async ctx => {
  const { id } = ctx.params
  if (!ObjectId.isValid(id)) {
    throw new ServerError(404)
  }

  const data = await EventGroup.findOne({
    _id: new ObjectId(id)
  }).populate('characters').exec()

  if (!data) {
    throw new ServerError(404)
  }

  const charactersByRole = getCharactersByRole(data.characters)

  ctx.body = {
    ...data.toObject(),
    dpsCount: charactersByRole.dps.length,
    supportCount: charactersByRole.support.length
  }
}

export default getById
