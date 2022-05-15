import mongoose from 'mongoose'
import Character from '../entities/Character.js'
import ServerError from '../errors/ServerError.js'
import { createCharacterSchema, updateCharacterSchema } from '../validators/characterSchemas.js'

const { ObjectId } = mongoose.Types

const getCharactersControllers = () => {
  const getAll = async ctx => {
    try {
      const data = await Character
        .find()
        .populate('guild')
        .exec()
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
    const data = await Character.findOne({
      _id: new ObjectId(id)
    }).populate('guild').exec()
    if (!data) {
      throw new ServerError(404)
    }
    ctx.body = data
  }

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

  const deleteOne = async ctx => {
    const { id } = ctx.params
    if (!ObjectId.isValid(id)) {
      throw new ServerError(404)
    }
    const character = await Character.deleteOne({
      _id: new ObjectId(id)
    })
    ctx.body = character
  }

  return {
    getAll,
    getById,
    create,
    updateOne,
    deleteOne
  }
}

export default getCharactersControllers
