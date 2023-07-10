import { AuthenticateController } from '@/infra/controllers/authenticate.controller'
import { makeAuthenticateUseCase } from '../usecases/authenticate.factory'

export const makeAuthenticateController = (): AuthenticateController => {
  return new AuthenticateController(makeAuthenticateUseCase())
}
