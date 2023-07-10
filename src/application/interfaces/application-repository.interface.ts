export interface ApplicationRepositoryInterface {
  getByAppId (appId: string): Promise<ApplicationRepositoryInterface.Output | null>
}

export namespace ApplicationRepositoryInterface {
  export type Output = {
    id: string
    appId: string
    description: string
    secretKey: string
  }
}
