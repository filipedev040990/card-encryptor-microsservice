import { DeleteCardUseCaseInterface } from '@/application/interfaces/delete-card-usecase.interface'
import { ServerError } from '@/shared/errors'
import { serverError, success } from '@/shared/helpers/http.helper'
import { InputController, OutputController } from '@/shared/types'

export class DeleteCardController {
  constructor (private readonly deleteCardUseCase: DeleteCardUseCaseInterface) {}

  async execute (input: InputController): Promise<OutputController> {
    try {
      await this.deleteCardUseCase.execute(input.params.id)
      return success(200, null)
    } catch (error: any) {
      return serverError(new ServerError(error))
    }
  }
}
