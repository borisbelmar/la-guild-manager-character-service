import Joi from 'joi'

const MONGO_ID_PATTERN = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i

export const createEventGroupSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().default(''),
  minIlvl: Joi.number().required(),
  dpsCount: Joi.number(),
  supportCount: Joi.number()
})

export const updateEventGroupSchema = Joi.object().keys({
  title: Joi.string(),
  description: Joi.string(),
  minIlvl: Joi.number(),
  dpsCount: Joi.number(),
  supportCount: Joi.number()
})

export const registerCharacterSchema = Joi.object().keys({
  character: Joi.string().pattern(MONGO_ID_PATTERN).required()
})
