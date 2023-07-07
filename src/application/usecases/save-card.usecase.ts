import { EncryptDataInterface } from '../interfaces/encrypt-data.interface'
import { SaveCardUseCaseInterface } from '../interfaces/save-card-usecase.interface'
import { UUIDGeneratorInterface } from '../interfaces/uuid-generator.interface'

export class SaveCardUseCase {
  constructor (
    private readonly encryptoAdapter: EncryptDataInterface,
    private readonly uuidGenerator: UUIDGeneratorInterface
  ) {}

  async execute (input: SaveCardUseCaseInterface.Input): Promise<void> {
    this.encryptoAdapter.execute(input)
    this.uuidGenerator.execute()
  }
}
