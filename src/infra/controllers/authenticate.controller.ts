import { MissingParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http.helper'
import { InputController } from '@/shared/types'

export class AuthenticateController {
  async execute (input: InputController): Promise<any> {
    const missingParam = this.validateInput(input)
    if (missingParam) {
      return badRequest(new MissingParamError(missingParam))
    }
  }

  private validateInput (input: InputController): string | null {
    const requiredFields = ['appId', 'secretKey']

    for (const field of requiredFields) {
      if (!input.body[field]) {
        return field
      }
    }
    return null
  }
}
