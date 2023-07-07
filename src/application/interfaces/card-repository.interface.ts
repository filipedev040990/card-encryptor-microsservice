export interface CardRepositoryInterface {
  save(input: CardRepositoryInterface.Input): Promise<void>
  delete (id: string): Promise<void>
}

export namespace CardRepositoryInterface {
  export type Input = {
    id: string
    encryptedCard: string
    createdAt: Date
  }
}
