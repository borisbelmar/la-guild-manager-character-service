import Router from '@koa/router'
import getEventGroupControllers from '../controllers/eventGroups.js'

const eventGroupRouter = new Router()
const controllers = getEventGroupControllers()

eventGroupRouter.get('/', controllers.getAll)
eventGroupRouter.get('/:id', controllers.getById)
eventGroupRouter.post('/', controllers.create)
eventGroupRouter.post('/:id/character', controllers.registerCharacter)
eventGroupRouter.put('/:id', controllers.updateOne)
eventGroupRouter.delete('/:id', controllers.deleteOne)

export default eventGroupRouter
