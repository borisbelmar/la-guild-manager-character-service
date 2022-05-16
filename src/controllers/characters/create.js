import Character from '../../entities/Character.js'
import ServerError from '../../errors/ServerError.js'
import { createCharacterSchema } from '../../validators/characterSchemas.js'

const create = async ctx => {
  const { userSession } = ctx.state
  const payload = ctx.request.body

  try {
    await createCharacterSchema.validateAsync(payload)
  } catch (e) {
    throw new ServerError(400, e.message)
  }

  const userCharacters = await Character.find({
    createdBy: userSession.sub
  })

  if (
    payload.isAlter !== undefined
    && !payload.isAlter
    && userCharacters.some(c => !c.isAlter)
  ) {
    throw new ServerError(400, 'Only one main character is allowed')
  }

  const character = await Character.create({
    ...payload,
    createdBy: userSession.sub,
    updateBy: userSession.sub
  })
  ctx.body = character
  ctx.status = 201
}

export default create
