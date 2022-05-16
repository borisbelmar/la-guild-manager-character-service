import mongoose from 'mongoose'
import EventGroup from '../../entities/EventGroup.js'
import ServerError from '../../errors/ServerError.js'
import { updateEventGroupSchema } from '../../validators/eventGroupSchema.js'

const { ObjectId } = mongoose.Types

const updateOne = async ctx => {
  const { id } = ctx.params
  const { userSession } = ctx.state
  if (!ObjectId.isValid(id)) {
    throw new ServerError(404)
  }
  const payload = ctx.request.body

  try {
    await updateEventGroupSchema.validateAsync(payload)
  } catch (e) {
    throw new ServerError(400, e.message)
  }

  const data = await EventGroup.updateOne({
    _id: new ObjectId(id)
  }, {
    ...payload,
    updateBy: userSession.sub
  })
  ctx.body = data
}

export default updateOne
