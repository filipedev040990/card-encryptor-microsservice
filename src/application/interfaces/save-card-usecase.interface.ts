export interface SaveCardUseCaseInterface {
  execute(input: SaveCardUseCaseInterface.Input): Promise<string>
}

export namespace SaveCardUseCaseInterface {
  export type Input = {
    brand: string
    number: string
    cvv: string
    expiryMonth: string
    expiryYear: string
  }
}
