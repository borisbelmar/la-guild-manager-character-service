import EventGroup from '../../entities/EventGroup.js'
import ServerError from '../../errors/ServerError.js'
import getCharactersByRole from '../../utils/getCharactersByRole.js'

const getAll = async ctx => {
  try {
    const data = await EventGroup.find().populate('characters').exec()
    ctx.body = data.map(eventGroup => {
      const charactersByRole = getCharactersByRole(eventGroup.characters)
      return {
        ...eventGroup.toObject(),
        dpsCount: charactersByRole.dps.length,
        supportCount: charactersByRole.support.length
      }
    })
  } catch (e) {
    throw new ServerError(500, e.message)
  }
}

export default getAll
