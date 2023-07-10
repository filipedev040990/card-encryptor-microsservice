import { AuthenticateApplicationUseCaseInterface } from '@/application/interfaces/authenticate-usecase.interface'
import { GeneralController } from '@/application/interfaces/general-controller.interface'
import { MissingParamError } from '@/shared/errors'
import { badRequest, success, unauthorized } from '@/shared/helpers/http.helper'
import { InputController, OutputController } from '@/shared/types'

export class AuthenticateController implements GeneralController {
  constructor (private readonly authenticateApplicationUseCase: AuthenticateApplicationUseCaseInterface) {}

  async execute (input: InputController): Promise<OutputController> {
    const missingParam = this.validateInput(input)
    if (missingParam) {
      return badRequest(new MissingParamError(missingParam))
    }

    const output = await this.authenticateApplicationUseCase.execute(input.body)
    if (output) {
      return success(200, output)
    }

    return unauthorized()
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
