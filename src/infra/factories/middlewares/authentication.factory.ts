import { JWTAdapter } from '@/infra/adapters/jwt.adapter'
import config from '@/infra/config'
import { ApplicationRepository } from '@/infra/database/repositories/application.repository'
import { AuthenticationMiddleware } from '@/infra/middlewares/authentication.middleware'

export const makeAuthenticationMiddleware = (): AuthenticationMiddleware => {
  const token = new JWTAdapter(config.jwt.secretkey, config.jwt.expiresInMs)
  const repository = new ApplicationRepository()
  return new AuthenticationMiddleware(token, repository)
}
