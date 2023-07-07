import { CardRepositoryInterface } from '@/application/interfaces/card-repository.interface'
import { EncryptDataInterface } from '@/application/interfaces/encrypt-data.interface'
import { SaveCardUseCaseInterface } from '@/application/interfaces/save-card-usecase.interface'
import { UUIDGeneratorInterface } from '@/application/interfaces/uuid-generator.interface'

export class SaveCardUseCase implements SaveCardUseCaseInterface {
  constructor (
    private readonly encryptoAdapter: EncryptDataInterface,
    private readonly uuidGenerator: UUIDGeneratorInterface,
    private readonly repository: CardRepositoryInterface
  ) {}

  async execute (input: SaveCardUseCaseInterface.Input): Promise<string> {
    const id = this.uuidGenerator.execute()

    await this.repository.save({
      id,
      encryptedCard: this.encryptoAdapter.execute(input),
      createdAt: new Date()
    })

    return id
  }
}
