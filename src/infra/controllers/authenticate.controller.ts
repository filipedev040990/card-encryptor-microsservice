import { AuthenticateApplicationUseCaseInterface } from '@/application/interfaces/authenticate-usecase.interface'
import { MissingParamError } from '@/shared/errors'
import { badRequest, success } from '@/shared/helpers/http.helper'
import { InputController } from '@/shared/types'

export class AuthenticateController {
  constructor (private readonly authenticateApplicationUseCase: AuthenticateApplicationUseCaseInterface) {}

  async execute (input: InputController): Promise<any> {
    const missingParam = this.validateInput(input)
    if (missingParam) {
      return badRequest(new MissingParamError(missingParam))
    }

    const output = await this.authenticateApplicationUseCase.execute(input.body)
    return success(200, output)
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
