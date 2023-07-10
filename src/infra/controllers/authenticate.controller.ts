import { MissingParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http.helper'
import { InputController } from '@/shared/types'

export class AuthenticateController {
  async execute (input: InputController): Promise<any> {
    if (!input.body.appid) {
      return badRequest(new MissingParamError('appId'))
    }
  }
}
