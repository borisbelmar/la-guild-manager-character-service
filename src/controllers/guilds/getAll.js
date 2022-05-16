import Guild from '../../entities/Guild.js'
import ServerError from '../../errors/ServerError.js'

const getAll = async ctx => {
  try {
    const data = await Guild.find()
    ctx.body = data
  } catch (e) {
    throw new ServerError(500, e.message)
  }
}

export default getAll
