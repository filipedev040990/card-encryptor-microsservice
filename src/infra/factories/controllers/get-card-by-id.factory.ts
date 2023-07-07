import { GetCardByIdController } from '@/infra/controllers/get-card-by-id.controller'
import { makeGetCardByIdUseCase } from '../usecases/get-card-by-id.factory'

export const makeGetCardByIdController = (): GetCardByIdController => {
  const getCardByIdUseCase = makeGetCardByIdUseCase()
  return new GetCardByIdController(getCardByIdUseCase)
}
