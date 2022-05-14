import Router from '@koa/router'
import charactersRouter from './characters.js'
import guildsRouter from './guilds.js'
import authRequired from '../middlewares/authRequired.js'
import eventGroupsRouter from './eventGroups.js'

const BASE_ROUTE = '/api'

const router = new Router()

router.use(`${BASE_ROUTE}/v1/characters`, authRequired, charactersRouter.routes())
router.use(`${BASE_ROUTE}/v1/guilds`, authRequired, guildsRouter.routes())
router.use(`${BASE_ROUTE}/v1/event-groups`, authRequired, eventGroupsRouter.routes())

router.get('/', ctx => {
  ctx.body = {
    app: process.env.npm_package_name,
    version: process.env.npm_package_version
  }
})

export default router
