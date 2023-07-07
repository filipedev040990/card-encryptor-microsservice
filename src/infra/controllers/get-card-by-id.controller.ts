import { GetCardByIdUseCaseInterface } from '@/application/interfaces/get-card-by-idusecase.interface'
import { InvalidParamError, MissingParamError, ServerError } from '@/shared/errors'
import { badRequest, serverError, success } from '@/shared/helpers/http.helper'
import { InputController } from '@/shared/types'

export class GetCardByIdController {
  constructor (private readonly getCardByIdUseCase: GetCardByIdUseCaseInterface) {}

  async execute (input: InputController): Promise<any> {
    try {
      if (!input?.params.id) {
        return badRequest(new MissingParamError('id'))
      }

      const output = await this.getCardByIdUseCase.execute(input.params.id)
      if (!output) {
        return badRequest(new InvalidParamError('id'))
      }

      return success(200, output)
    } catch (error: any) {
      return serverError(new ServerError(error))
    }
  }
}
