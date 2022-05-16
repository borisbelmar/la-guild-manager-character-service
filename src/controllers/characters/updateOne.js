import mongoose from 'mongoose'
import Character from '../../entities/Character.js'
import ServerError from '../../errors/ServerError.js'
import { updateCharacterSchema } from '../../validators/characterSchemas.js'

const { ObjectId } = mongoose.Types

const updateOne = async ctx => {
  const { userSession } = ctx.state
  const { id } = ctx.params
  if (!ObjectId.isValid(id)) {
    throw new ServerError(404)
  }
  const payload = ctx.request.body

  try {
    await updateCharacterSchema.validateAsync(payload)
  } catch (e) {
    throw new ServerError(400, e.message)
  }

  const userCharacters = await Character.find({
    createdBy: userSession.sub
  })

  if (!userCharacters.some(c => c._id.toString() === id)) {
    throw new ServerError(404)
  }

  if (
    payload.isAlter !== undefined
    && !payload.isAlter
    && userCharacters.filter(c => c._id.toString() !== id).some(c => !c.isAlter)
  ) {
    throw new ServerError(400, 'Only one main character is allowed')
  }

  const updatedCharacter = await Character.updateOne({
    _id: new ObjectId(id)
  }, {
    ...payload,
    updateBy: userSession.sub
  })
  ctx.body = updatedCharacter
}

export default updateOne
