import axios from 'axios'
import ServerError from '../errors/ServerError.js'

export default function getAuthService() {
  const client = axios.create({
    baseURL: `${process.env.AUTH_SERVICE}/api/v1`,
  })

  const validateToken = async token => {
    try {
      const { data } = await client.get(`/verify?token=${token}`)
      return data
    } catch (e) {
      throw new ServerError(401)
    }
  }

  return {
    validateToken
  }
}
