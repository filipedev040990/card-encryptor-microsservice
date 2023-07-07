import { CardRepositoryInterface } from '../interfaces/card-repository.interface'
import { GetCardByIdUseCaseInterface } from '../interfaces/get-card-by-idusecase.interface'

export class GetCardByIdUseCase implements GetCardByIdUseCaseInterface {
  constructor (private readonly repository: CardRepositoryInterface) {}
  async execute (id: string): Promise<GetCardByIdUseCaseInterface.Output | null> {
    await this.repository.getById(id)
    return null
  }
}
