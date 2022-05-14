import Router from '@koa/router'
import getGuildControllers from '../controllers/guilds.js'

const guildRouter = new Router()
const controllers = getGuildControllers()

guildRouter.get('/', controllers.getAll)
guildRouter.get('/:id', controllers.getById)
guildRouter.post('/', controllers.create)
guildRouter.put('/:id', controllers.updateOne)
guildRouter.delete('/:id', controllers.deleteOne)

export default guildRouter
