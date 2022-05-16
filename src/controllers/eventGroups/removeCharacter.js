import mongoose from 'mongoose'
import Character from '../../entities/Character.js'
import EventGroup from '../../entities/EventGroup.js'
import ServerError from '../../errors/ServerError.js'

const { ObjectId } = mongoose.Types

const removeCharacter = async ctx => {
  const { userSession } = ctx.state
  const { id } = ctx.params
  if (!ObjectId.isValid(id)) {
    throw new ServerError(404)
  }
  const payload = ctx.request.body

  const eventGroup = await EventGroup.findOne({
    _id: new ObjectId(id)
  }).populate('characters').exec()

  if (!eventGroup) {
    throw new ServerError(404, 'Event group not found')
  }

  const character = await Character.findOne({
    _id: new ObjectId(payload.character)
  })

  if (!character) {
    throw new ServerError(404, 'Character not found')
  }

  if (character.createdBy.toString() !== userSession.sub) {
    throw new ServerError(403, 'You dont have permissions to remove this character')
  }

  const data = await EventGroup.updateOne(
    {
      _id: new ObjectId(id)
    },
    {
      $pull: {
        characters: payload.character
      }
    }
  )
  ctx.body = data
}

export default removeCharacter
