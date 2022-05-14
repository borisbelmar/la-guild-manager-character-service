import Router from '@koa/router'
import getCharacterControllers from '../controllers/characters.js'

const characterRouter = new Router()
const controllers = getCharacterControllers()

characterRouter.get('/', controllers.getAll)
characterRouter.get('/:id', controllers.getById)
characterRouter.post('/', controllers.create)
characterRouter.put('/:id', controllers.updateOne)
characterRouter.delete('/:id', controllers.deleteOne)

export default characterRouter
