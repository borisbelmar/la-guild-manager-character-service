import ServerError from '../errors/ServerError.js'
import getAuthService from '../services/auth.js'

const authRequired = async (ctx, next) => {
  try {
    const { authorization } = ctx.headers
    if (!authorization) {
      throw new ServerError(401)
    }
    const [authType, token] = authorization.split(' ')
    if (authType !== 'Bearer') { throw Error('Invalid auth type') }
    const jwtPayload = await getAuthService().validateToken(token)
    ctx.state.userSession = jwtPayload
  } catch (e) {
    throw new ServerError(401)
  }
  await next()
}

export default authRequired
