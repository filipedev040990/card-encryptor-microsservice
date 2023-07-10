export interface ApplicationRepositoryInterface {
  authenticate (input: ApplicationRepositoryInterface.Input): Promise<string | null>
}

export namespace ApplicationRepositoryInterface {
  export type Input = {
    appId: string
    secretKey: string
  }
}
