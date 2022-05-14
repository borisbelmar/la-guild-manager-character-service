import Joi from 'joi'

export const createGuildSchema = Joi.object().keys({
  name: Joi.string().required()
})

export const updateGuildSchema = Joi.object().keys({
  name: Joi.string()
})
