import { MissingParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http.helper'
import { InputController } from '@/shared/types'

export class GetCardByIdController {
  async execute (input: InputController): Promise<any> {
    if (!input?.params.id) {
      return badRequest(new MissingParamError('id'))
    }
  }
}
