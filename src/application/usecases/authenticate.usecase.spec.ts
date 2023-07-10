import { mock } from 'jest-mock-extended'
import { AuthenticateApplicationUseCaseInterface } from '../interfaces/authenticate-usecase.interface'
import { AuthenticateApplicationUseCase } from './authenticate.usecase'
import { ApplicationRepositoryInterface } from '../interfaces/application-repository.interface'

describe('AuthenticateApplicationUseCase', () => {
  let sut: AuthenticateApplicationUseCase
  let input: AuthenticateApplicationUseCaseInterface.Input

  const repository = mock<ApplicationRepositoryInterface>()

  beforeAll(() => {
    sut = new AuthenticateApplicationUseCase(repository)

    input = {
      appId: 'anyAppId',
      secretKey: 'anySecretKey'
    }
  })

  test('should call ApplicationRepository.authenticate once and with correct values', async () => {
    await sut.execute(input)

    expect(repository.authenticate).toHaveBeenCalledTimes(1)
    expect(repository.authenticate).toHaveBeenCalledWith({
      appId: 'anyAppId',
      secretKey: 'anySecretKey'
    })
  })
})
