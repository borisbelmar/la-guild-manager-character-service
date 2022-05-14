import mongoose from 'mongoose'
import Guild from '../entities/Guild.js'
import ServerError from '../errors/ServerError.js'
import { createGuildSchema, updateGuildSchema } from '../validators/guildSchemas.js'

const { ObjectId } = mongoose.Types

const getGuildsControllers = () => {
  const getAll = async ctx => {
    try {
      const data = await Guild.find()
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
    const data = await Guild.findById(id)
    if (!data) {
      throw new ServerError(404)
    }
    ctx.body = data
  }

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

  const deleteOne = async ctx => {
    const { id } = ctx.params
    if (!ObjectId.isValid(id)) {
      throw new ServerError(404)
    }
    const data = await Guild.deleteOne({
      _id: new ObjectId(id)
    })
    ctx.body = data
  }

  return {
    getAll,
    getById,
    create,
    updateOne,
    deleteOne
  }
}

export default getGuildsControllers
