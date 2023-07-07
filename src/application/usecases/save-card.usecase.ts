import { EncryptDataInterface } from '../interfaces/encrypt-data.interface'
import { SaveCardUseCaseInterface } from '../interfaces/save-card-usecase.interface'

export class SaveCardUseCase {
  constructor (private readonly encryptoAdapter: EncryptDataInterface) {}
  async execute (input: SaveCardUseCaseInterface.Input): Promise<void> {
    await this.encryptoAdapter.execute(input)
  }
}
