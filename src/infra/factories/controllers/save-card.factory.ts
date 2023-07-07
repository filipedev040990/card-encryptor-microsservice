import { SaveCardController } from '@/infra/controllers/save-card.controller'
import { makeSaveCardUseCase } from '../usecases/save-card.factory'

export const makeSaveCardController = (): SaveCardController => {
  const saveCardUseCase = makeSaveCardUseCase()
  return new SaveCardController(saveCardUseCase)
}
