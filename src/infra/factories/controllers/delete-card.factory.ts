import { DeleteCardController } from '@/infra/controllers/delete-card.controller'
import { makeDeleteCardUseCase } from '../usecases/delete-card.factory'

export const makeDeleteCardController = (): DeleteCardController => {
  const deleteCardUseCase = makeDeleteCardUseCase()
  return new DeleteCardController(deleteCardUseCase)
}
