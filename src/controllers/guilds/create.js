import Guild from '../../entities/Guild.js'
import ServerError from '../../errors/ServerError.js'
import { createGuildSchema } from '../../validators/guildSchemas.js'

const create = async ctx => {
  const payload = ctx.request.body
  const { userSession } = ctx.state

  try {
    await createGuildSchema.validateAsync(payload)
  } catch (e) {
    throw new ServerError(400, e.message)
  }

  const data = await Guild.create({
    ...payload,
    createdBy: userSession.sub,
    updateBy: userSession.sub
  })
  ctx.body = data
  ctx.status = 201
}

export default create
