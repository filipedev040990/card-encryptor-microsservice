import { forbiddenError } from '@/shared/helpers/http.helper'
import { InputController } from '@/shared/types'

export class AuthenticationMiddleware {
  async execute (input: InputController): Promise<any> {
    if (!input?.headers?.authorization) {
      return forbiddenError()
    }
  }
}
