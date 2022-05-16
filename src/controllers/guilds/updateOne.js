import mongoose from 'mongoose'
import Guild from '../../entities/Guild.js'
import ServerError from '../../errors/ServerError.js'
import { updateGuildSchema } from '../../validators/guildSchemas.js'

const { ObjectId } = mongoose.Types

const updateOne = async ctx => {
  const { id } = ctx.params
  const { userSession } = ctx.state
  if (!ObjectId.isValid(id)) {
    throw new ServerError(404)
  }
  const payload = ctx.request.body

  try {
    await updateGuildSchema.validateAsync(payload)
  } catch (e) {
    throw new ServerError(400, e.message)
  }

  const data = await Guild.updateOne({
    _id: new ObjectId(id)
  }, {
    ...payload,
    updateBy: userSession.sub
  })
  ctx.body = data
}

export default updateOne
