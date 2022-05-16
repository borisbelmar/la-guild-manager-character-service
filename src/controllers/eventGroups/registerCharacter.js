import mongoose from 'mongoose'
import CLASSES from '../../constants/classes.js'
import EVENT_TYPES from '../../constants/eventTypes.js'
import Character from '../../entities/Character.js'
import EventGroup from '../../entities/EventGroup.js'
import ServerError from '../../errors/ServerError.js'
import getCharactersByRole from '../../utils/getCharactersByRole.js'
import { registerCharacterSchema } from '../../validators/eventGroupSchema.js'

const { ObjectId } = mongoose.Types

const registerCharacter = async ctx => {
  const { userSession } = ctx.state
  const { id } = ctx.params

  if (!ObjectId.isValid(id)) {
    throw new ServerError(404)
  }
  const payload = ctx.request.body

  try {
    await registerCharacterSchema.validateAsync(payload)
  } catch (e) {
    throw new ServerError(400, e.message)
  }

  const eventGroup = await EventGroup.findOne({
    _id: new ObjectId(id)
  }).populate('characters').exec()

  const eventType = EVENT_TYPES[eventGroup.type]

  const character = await Character.findOne({
    _id: new ObjectId(payload.character)
  })

  if (!character) {
    throw new ServerError(404, 'Character not found')
  }

  if (character.createdBy === userSession.sub) {
    throw new ServerError(403, 'You dont have permissions to add this character')
  }

  if (!eventGroup) {
    throw new ServerError(404, 'Event group not found')
  }

  if (eventType.minIlvl > character.ilvl) {
    throw new ServerError(400, 'Character ilvl is lower than event group ilvl')
  }

  if (eventGroup.characters.some(c => c._id === character._id)) {
    throw new ServerError(409, 'Character already registered')
  }

  if (eventGroup.characters.some(c => c.createdBy.toString() === userSession.sub)) {
    throw new ServerError(400, 'You cant register more than one character here')
  }

  const charactersByRole = getCharactersByRole(eventGroup.characters)

  if (
    CLASSES[character.class] === 'dps'
    && charactersByRole.dps.length >= eventType.dps
  ) {
    throw new ServerError(400, 'Dps limit reached')
  }

  if (
    CLASSES[character.class] === 'support'
    && charactersByRole.support.length >= eventType.support
  ) {
    throw new ServerError(400, 'Support limit reached')
  }

  const data = await EventGroup.updateOne(
    {
      _id: new ObjectId(id)
    },
    {
      $push: {
        characters: payload.character
      }
    }
  )
  ctx.body = data
}

export default registerCharacter
