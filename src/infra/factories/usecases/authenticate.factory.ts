import { AuthenticateApplicationUseCase } from '@/application/usecases/authenticate.usecase'
import { BcryptAdapter } from '@/infra/adapters/bcrypt.adapter'
import { JWTAdapter } from '@/infra/adapters/jwt.adapter'
import config from '@/infra/config'
import { ApplicationRepository } from '@/infra/database/repositories/application.repository'

export const makeAuthenticateUseCase = (): AuthenticateApplicationUseCase => {
  const repository = new ApplicationRepository()
  const tokenGenerator = new JWTAdapter(config.jwt.secretkey, config.jwt.expiresInMs)
  const hasher = new BcryptAdapter()
  return new AuthenticateApplicationUseCase(repository, tokenGenerator, hasher)
}
