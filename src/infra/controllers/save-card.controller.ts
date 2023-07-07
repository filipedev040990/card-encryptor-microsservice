import { GeneralController } from '@/application/interfaces/general-controller.interface'
import { SaveCardUseCaseInterface } from '@/application/interfaces/save-card-usecase.interface'
import { MissingParamError } from '@/shared/errors'
import { badRequest, serverError, success } from '@/shared/helpers/http.helper'
import { InputController, OutputController } from '@/shared/types'

export class SaveCardController implements GeneralController {
  constructor (private readonly saveCardUseCase: SaveCardUseCaseInterface) {}

  async execute (input: InputController): Promise<OutputController> {
    try {
      const missingParam = this.validateInput(input)
      if (missingParam) {
        return badRequest(new MissingParamError(missingParam))
      }

      const identifier = await this.saveCardUseCase.execute(input.body)

      return success(201, { identifier })
    } catch (error: any) {
      return serverError(error)
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
