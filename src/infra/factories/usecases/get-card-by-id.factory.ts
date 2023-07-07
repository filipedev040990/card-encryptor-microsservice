import { GetCardByIdUseCase } from '@/application/usecases/get-card-by-id.usecase'
import { CryptoJsAdapter } from '@/infra/adapters/cryptoJs.adapter'
import { CardRepository } from '@/infra/database/repositories/card.repository'

export const makeGetCardByIdUseCase = (): GetCardByIdUseCase => {
  const encryptKey = process.env.ENCRYPT_KEY
  const encrypto = new CryptoJsAdapter(encryptKey!)
  const repository = new CardRepository()
  return new GetCardByIdUseCase(repository, encrypto)
}
