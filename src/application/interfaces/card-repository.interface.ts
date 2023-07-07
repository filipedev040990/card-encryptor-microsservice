import { GetCardUseCaseInterface } from './get-card-by-idusecase.interface'

export interface CardRepositoryInterface {
  save(input: CardRepositoryInterface.Input): Promise<void>
  delete (id: string): Promise<void>
  getById (id: string): Promise<GetCardUseCaseInterface.Output>
}

export namespace CardRepositoryInterface {
  export type Input = {
    id: string
    encryptedCard: string
    createdAt: Date
  }
}
