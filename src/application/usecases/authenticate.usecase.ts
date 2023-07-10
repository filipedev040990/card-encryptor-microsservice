import { ApplicationRepositoryInterface } from '../interfaces/application-repository.interface'
import { AuthenticateApplicationUseCaseInterface } from '../interfaces/authenticate-usecase.interface'
import { TokenInterface } from '../interfaces/token.interface'

export class AuthenticateApplicationUseCase implements AuthenticateApplicationUseCaseInterface {
  constructor (
    private readonly repository: ApplicationRepositoryInterface,
    private readonly token: TokenInterface
  ) {}

  async execute (input: AuthenticateApplicationUseCaseInterface.Input): Promise<AuthenticateApplicationUseCaseInterface.Output | null> {
    await this.repository.authenticate(input)
    this.token.generate(input)
    return null
  }
}
