import Router from '@koa/router'
import {
  getAll,
  getById,
  create,
  registerCharacter,
  removeCharacter,
  updateOne,
  deleteOne
} from '../controllers/eventGroups/index.js'

const eventGroupRouter = new Router()

eventGroupRouter.get('/', getAll)
eventGroupRouter.get('/:id', getById)
eventGroupRouter.post('/', create)
eventGroupRouter.post('/:id/characters/add', registerCharacter)
eventGroupRouter.post('/:id/characters/remove', removeCharacter)
eventGroupRouter.put('/:id', updateOne)
eventGroupRouter.delete('/:id', deleteOne)

export default eventGroupRouter
