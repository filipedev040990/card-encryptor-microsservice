import { GeneralController } from '@/application/interfaces/general-controller.interface'
import { GetCardByIdUseCaseInterface } from '@/application/interfaces/get-card-by-idusecase.interface'
import { InvalidParamError, ServerError } from '@/shared/errors'
import { badRequest, serverError, success } from '@/shared/helpers/http.helper'
import { InputController, OutputController } from '@/shared/types'

export class GetCardByIdController implements GeneralController {
  constructor (private readonly getCardByIdUseCase: GetCardByIdUseCaseInterface) {}

  async execute (input: InputController): Promise<OutputController> {
    try {
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
