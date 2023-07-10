import { ApplicationRepositoryInterface } from '../interfaces/application-repository.interface'
import { AuthenticateApplicationUseCaseInterface } from '../interfaces/authenticate-usecase.interface'

export class AuthenticateApplicationUseCase implements AuthenticateApplicationUseCaseInterface {
  constructor (private readonly repository: ApplicationRepositoryInterface) {}

  async execute (input: AuthenticateApplicationUseCaseInterface.Input): Promise<AuthenticateApplicationUseCaseInterface.Output | null> {
    await this.repository.authenticate(input)
    return null
  }
}
