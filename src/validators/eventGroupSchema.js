import Joi from 'joi'
import EVENT_TYPES from '../constants/eventTypes'

const MONGO_ID_PATTERN = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i

export const createEventGroupSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().default(''),
  type: Joi.string().valid(...Object.keys(EVENT_TYPES)).required(),
  startAt: Joi.date().required()
})

export const updateEventGroupSchema = Joi.object().keys({
  title: Joi.string(),
  description: Joi.string(),
  type: Joi.string().valid(...Object.keys(EVENT_TYPES)),
  startAt: Joi.date(),
  open: Joi.boolean()
})

export const registerCharacterSchema = Joi.object().keys({
  character: Joi.string().pattern(MONGO_ID_PATTERN).required()
})
