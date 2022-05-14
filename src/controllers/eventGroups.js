import mongoose from 'mongoose'
import EventGroup from '../entities/EventGroup.js'
import ServerError from '../errors/ServerError.js'
import Character from '../entities/Character.js'
import {
  createEventGroupSchema,
  registerCharacterSchema,
  updateEventGroupSchema
} from '../validators/eventGroupSchema.js'
import CLASSES from '../constants/classes.js'

const { ObjectId } = mongoose.Types

const getEventGroupsControllers = () => {
  const getAll = async ctx => {
    try {
      const data = await EventGroup.find()
      ctx.body = data
    } catch (e) {
      throw new ServerError(500, e.message)
    }
  }

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
    ctx.body = data
  }

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

    const character = await Character.findOne({
      _id: new ObjectId(id)
    })

    if (!character) {
      throw new ServerError(404, 'Character not found')
    }

    if (character.createdBy === userSession.sub) {
      throw new ServerError(403, 'You dont have permissions to add this character')
    }

    const eventGroup = await EventGroup.findOne({
      _id: new ObjectId(id)
    }).populate('characters').exec()

    if (!eventGroup) {
      throw new ServerError(404, 'Event group not found')
    }

    if (eventGroup.minIlvl > character.ilvl) {
      throw new ServerError(400, 'Character ilvl is lower than event group ilvl')
    }

    if (eventGroup.characters.some(c => c.id === character.id)) {
      throw new ServerError(409, 'Character already registered')
    }

    if (eventGroup.characters.filter(c => c.createdBy === userSession.sub).length > 0) {
      throw new ServerError(400, 'You cant register more than one character here')
    }

    const charactersByRole = eventGroup.characters.reduce(
      (acc, c) => acc[CLASSES[c.class]].push(c), { dps: [], support: [] }
    )

    if (
      CLASSES[character.class] === 'dps'
      && charactersByRole.dps.length >= eventGroup.dpsCount
    ) {
      throw new ServerError(400, 'Dps limit reached')
    }

    if (
      CLASSES[character.class] === 'support'
      && charactersByRole.support.length >= eventGroup.supportCount
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
      _id: new ObjectId(id),
      createdBy: userSession.sub
    }, {
      ...payload,
      updateBy: userSession.sub
    })
    ctx.body = data
  }

  const deleteOne = async ctx => {
    const { id } = ctx.params
    const { userSession } = ctx.state
    const data = await EventGroup.deleteOne({
      _id: new ObjectId(id),
      createdBy: userSession.sub
    })
    ctx.body = data
  }

  return {
    getAll,
    getById,
    create,
    updateOne,
    deleteOne,
    registerCharacter
  }
}

export default getEventGroupsControllers
