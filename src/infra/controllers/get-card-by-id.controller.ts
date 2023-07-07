import { GetCardByIdUseCaseInterface } from '@/application/interfaces/get-card-by-idusecase.interface'
import { InvalidParamError, MissingParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http.helper'
import { InputController } from '@/shared/types'

export class GetCardByIdController {
  constructor (private readonly getCardByIdUseCase: GetCardByIdUseCaseInterface) {}

  async execute (input: InputController): Promise<any> {
    if (!input?.params.id) {
      return badRequest(new MissingParamError('id'))
    }

    const output = await this.getCardByIdUseCase.execute(input.params.id)
    if (!output) {
      return badRequest(new InvalidParamError('id'))
    }
  }
}
