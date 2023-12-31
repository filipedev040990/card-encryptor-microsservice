import { ApplicationRepositoryInterface } from '@/application/interfaces/application-repository.interface'
import { TokenInterface } from '@/application/interfaces/token.interface'
import { forbiddenError, success, unauthorized } from '@/shared/helpers/http.helper'
import { InputController } from '@/shared/types'

export class AuthenticationMiddleware {
  constructor (
    private readonly token: TokenInterface,
    private readonly repository: ApplicationRepositoryInterface
  ) {}

  async execute (input: InputController): Promise<any> {
    if (input?.headers?.authorization) {
      const token = input.headers.authorization.split('Bearer ')[1]

      const response = await this.token.validate(token)
      if (response) {
        const application = await this.repository.getByAppId(response.appId)
        if (application) {
          return success(200, application)
        }
      }

      return unauthorized()
    }

    return forbiddenError()
  }
}
