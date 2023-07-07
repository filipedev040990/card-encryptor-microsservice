import { CardRepositoryInterface } from '@/application/interfaces/card-repository.interface'
import { SaveCardUseCaseInterface } from '@/application/interfaces/save-card-usecase.interface'
import { UUIDGeneratorInterface } from '@/application/interfaces/uuid-generator.interface'
import { CryptographyInterface } from '../interfaces/cryptography.interface'

export class SaveCardUseCase implements SaveCardUseCaseInterface {
  constructor (
    private readonly encryptoAdapter: CryptographyInterface,
    private readonly uuidGenerator: UUIDGeneratorInterface,
    private readonly repository: CardRepositoryInterface
  ) {}

  async execute (input: SaveCardUseCaseInterface.Input): Promise<string> {
    const id = this.uuidGenerator.execute()

    await this.repository.save({
      id,
      encryptedCard: this.encryptoAdapter.encrypt(input),
      createdAt: new Date()
    })

    return id
  }
}
