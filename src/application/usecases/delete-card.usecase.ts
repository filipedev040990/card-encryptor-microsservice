import { DeleteCardUseCaseInterface } from '@/application/interfaces/delete-card-usecase.interface'
import { CardRepositoryInterface } from '../interfaces/card-repository.interface'

export class DeleteCardUseCase implements DeleteCardUseCaseInterface {
  constructor (private readonly repository: CardRepositoryInterface) {}
  async execute (id: string): Promise<void> {
    const card = await this.repository.getById(id)
    if (card) {
      await this.repository.delete(id)
    }
  }
}
