export interface CardRepository {
  save(input: CardRepository.Input): Promise<void>
  delete (id: string): Promise<void>
}

export namespace CardRepository {
  export type Input = {
    id: string
    encryptedCard: string
    createdAt: Date
  }
}
