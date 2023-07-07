import { SaveCardUseCase } from '@/application/usecases/save-card.usecase'
import { CryptoJsAdapter } from '@/infra/adapters/cryptoJs.adapter'
import { UUIDGenerator } from '@/infra/adapters/uuid.adapter'
import { CardRepository } from '@/infra/database/repositories/card.repository'

export const makeSaveCardUseCase = (): SaveCardUseCase => {
  const encryptKey = process.env.ENCRYPT_KEY
  const encrypto = new CryptoJsAdapter(encryptKey!)
  const uuidGenerator = new UUIDGenerator()
  const repository = new CardRepository()
  return new SaveCardUseCase(encrypto, uuidGenerator, repository)
}
