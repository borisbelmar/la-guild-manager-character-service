import EventGroup from '../../entities/EventGroup.js'
import ServerError from '../../errors/ServerError.js'
import { createEventGroupSchema } from '../../validators/eventGroupSchema.js'

const create = async ctx => {
  const { userSession } = ctx.state
  const payload = ctx.request.body

  try {
    await createEventGroupSchema.validateAsync(payload)
  } catch (e) {
    throw new ServerError(400, e.message)
  }

  const data = await EventGroup.create({
    ...payload,
    createdBy: userSession.sub,
    updateBy: userSession.sub
  })
  ctx.body = data
  ctx.status = 201
}

export default create
