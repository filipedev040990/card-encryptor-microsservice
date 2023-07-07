import { DeleteCardUseCase } from '@/application/usecases/delete-card.usecase'
import { CardRepository } from '@/infra/database/repositories/card.repository'

export const makeDeleteCardUseCase = (): DeleteCardUseCase => {
  const repository = new CardRepository()
  return new DeleteCardUseCase(repository)
}
