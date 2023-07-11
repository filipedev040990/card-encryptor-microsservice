import { TokenInterface } from '@/application/interfaces/token.interface'
import { forbiddenError, unauthorized } from '@/shared/helpers/http.helper'
import { InputController } from '@/shared/types'

export class AuthenticationMiddleware {
  constructor (private readonly token: TokenInterface) {}

  async execute (input: InputController): Promise<any> {
    if (!input?.headers?.authorization) {
      return forbiddenError()
    }

    const token = input.headers.authorization.split('Bearer ')[1]

    const validToken = await this.token.validate(token)
    if (!validToken) {
      return unauthorized()
    }
  }
}
