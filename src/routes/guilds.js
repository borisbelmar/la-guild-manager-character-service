import Router from '@koa/router'
import {
  getAll,
  getById,
  create,
  updateOne,
  deleteOne
} from '../controllers/guilds/index.js'

const guildRouter = new Router()

guildRouter.get('/', getAll)
guildRouter.get('/:id', getById)
guildRouter.post('/', create)
guildRouter.put('/:id', updateOne)
guildRouter.delete('/:id', deleteOne)

export default guildRouter
