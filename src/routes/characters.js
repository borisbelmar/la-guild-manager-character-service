import Router from '@koa/router'
import {
  getAll,
  getById,
  create,
  updateOne,
  deleteOne
} from '../controllers/characters/index.js'

const characterRouter = new Router()

characterRouter.get('/', getAll)
characterRouter.get('/:id', getById)
characterRouter.post('/', create)
characterRouter.put('/:id', updateOne)
characterRouter.delete('/:id', deleteOne)

export default characterRouter
