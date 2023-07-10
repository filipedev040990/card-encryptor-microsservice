import { ApplicationRepositoryInterface } from '../interfaces/application-repository.interface'
import { AuthenticateApplicationUseCaseInterface } from '../interfaces/authenticate-usecase.interface'
import { HashInterface } from '../interfaces/hash.interface'
import { TokenInterface } from '../interfaces/token.interface'

export class AuthenticateApplicationUseCase implements AuthenticateApplicationUseCaseInterface {
  constructor (
    private readonly repository: ApplicationRepositoryInterface,
    private readonly token: TokenInterface,
    private readonly hasher: HashInterface
  ) {}

  async execute (input: AuthenticateApplicationUseCaseInterface.Input): Promise<AuthenticateApplicationUseCaseInterface.Output | null> {
    const appExists = await this.repository.getByAppId(input.appId)
    if (appExists) {
      const validSecret = await this.hasher.compare(input.secretKey, appExists.secretKey)
      if (validSecret) {
        const token = this.token.generate(input)
        return { token }
      }
    }
    return null
  }
}
