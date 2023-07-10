export interface AuthenticateApplicationUseCaseInterface {
  execute(input: AuthenticateApplicationUseCaseInterface.Input): Promise<AuthenticateApplicationUseCaseInterface.Output | null>
}

export namespace AuthenticateApplicationUseCaseInterface {
  export type Input = {
    appId: string
    secretKey: string
  }

  export type Output = {
    token: string
  }
}
