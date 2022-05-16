import Character from '../../entities/Character.js'
import ServerError from '../../errors/ServerError.js'

const getAll = async ctx => {
  try {
    const data = await Character.find().populate('guild').exec()
    ctx.body = data
  } catch (e) {
    throw new ServerError(500, e.message)
  }
}

export default getAll
