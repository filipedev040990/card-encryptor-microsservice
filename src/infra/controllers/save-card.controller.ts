import { MissingParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http.helper'
import { InputController } from '@/shared/types'

export class SaveCardController {
  async execute (input: InputController): Promise<any> {
    const missingParam = this.validateInput(input)
    if (missingParam) {
      return badRequest(new MissingParamError(missingParam))
    }
  }

  private validateInput (input: InputController): string | null {
    const requiredFields = ['brand', 'number', 'cvv', 'expiryMonth', 'expiryYear']
    for (const field of requiredFields) {
      if (!input.body[field]) {
        return field
      }
    }
    return null
  }
}
