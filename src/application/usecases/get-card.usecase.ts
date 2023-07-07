import { CardRepositoryInterface } from '../interfaces/card-repository.interface'
import { CryptographyInterface } from '../interfaces/cryptography.interface'
import { GetCardByIdUseCaseInterface } from '../interfaces/get-card-by-idusecase.interface'

export class GetCardByIdUseCase implements GetCardByIdUseCaseInterface {
  constructor (
    private readonly repository: CardRepositoryInterface,
    private readonly cryptography: CryptographyInterface
  ) {}

  async execute (id: string): Promise<GetCardByIdUseCaseInterface.Output | null> {
    const encryptedData = await this.repository.getById(id)

    if (encryptedData) {
      this.cryptography.decrypt(encryptedData)
    }
    return null
  }
}
