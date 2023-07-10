export interface ApplicationRepositoryInterface {
  authenticate (input: ApplicationRepositoryInterface.Input): Promise<boolean>
}

export namespace ApplicationRepositoryInterface {
  export type Input = {
    appId: string
    secretKey: string
  }
}
