export interface GetCardByIdUseCaseInterface {
  execute(id: string): Promise<GetCardByIdUseCaseInterface.Output | null>
}

export namespace GetCardByIdUseCaseInterface {
  export type Output = {
    brand: string
    number: string
    cvv: string
    expiryMonth: string
    expiryYear: string
  }
}
