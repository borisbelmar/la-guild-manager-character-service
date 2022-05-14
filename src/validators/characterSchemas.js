import Joi from 'joi'
import CLASSES from '../constants/classes.js'

const MONGO_ID_PATTERN = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i

export const createCharacterSchema = Joi.object().keys({
  name: Joi.string().required(),
  ilvl: Joi.number().required(),
  isAlter: Joi.boolean(),
  class: Joi.string().valid(...Object.keys(CLASSES)).required(),
  guild: Joi.string().regex(MONGO_ID_PATTERN).allow(null).required()
})

export const updateCharacterSchema = Joi.object().keys({
  name: Joi.string(),
  ilvl: Joi.number(),
  isAlter: Joi.boolean(),
  class: Joi.string().valid(...Object.keys(CLASSES)),
  guild: Joi.string().regex(MONGO_ID_PATTERN).allow(null)
})
