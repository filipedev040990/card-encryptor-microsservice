import { SaveCardUseCaseInterface } from '@/application/interfaces/save-card-usecase.interface'
import { MissingParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http.helper'
import { InputController } from '@/shared/types'

export class SaveCardController {
  constructor (private readonly saveCardUseCase: SaveCardUseCaseInterface) {}

  async execute (input: InputController): Promise<any> {
    const missingParam = this.validateInput(input)
    if (missingParam) {
      return badRequest(new MissingParamError(missingParam))
    }

    await this.saveCardUseCase.execute(input.body)
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
