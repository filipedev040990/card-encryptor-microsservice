export interface SaveCardUseCaseInterface {
  execute(input: SaveCardUseCaseInterface.Input): Promise<SaveCardUseCaseInterface.Output>
}

export namespace SaveCardUseCaseInterface {
  export type Input = {
    brand: string
    number: string
    cvv: string
    expiryMonth: string
    expiryYear: string
  }

  export type Output = {
    cardIdentifier: string
  }
}
