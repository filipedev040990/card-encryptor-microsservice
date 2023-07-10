import { AuthenticateApplicationUseCaseInterface } from '../interfaces/authenticate-usecase.interface'
import { AuthenticateApplicationUseCase } from './authenticate.usecase'
import { ApplicationRepositoryInterface } from '../interfaces/application-repository.interface'
import { mock } from 'jest-mock-extended'
import { TokenInterface } from '../interfaces/token.interface'

describe('AuthenticateApplicationUseCase', () => {
  let sut: AuthenticateApplicationUseCase
  let input: AuthenticateApplicationUseCaseInterface.Input

  const repository = mock<ApplicationRepositoryInterface>()
  const token = mock<TokenInterface>()

  beforeAll(() => {
    sut = new AuthenticateApplicationUseCase(repository, token)

    input = {
      appId: 'anyAppId',
      secretKey: 'anySecretKey'
    }

    repository.authenticate.mockResolvedValue(true)
    token.generate.mockReturnValue('anyToken')
  })

  test('should call ApplicationRepository.authenticate once and with correct values', async () => {
    await sut.execute(input)

    expect(repository.authenticate).toHaveBeenCalledTimes(1)
    expect(repository.authenticate).toHaveBeenCalledWith({
      appId: 'anyAppId',
      secretKey: 'anySecretKey'
    })
  })

  test('should return null if ApplicationRepository.authenticate returns false', async () => {
    repository.authenticate.mockResolvedValueOnce(false)

    const output = await sut.execute(input)

    expect(output).toBeNull()
  })

  test('should call TokenGenerator once and with correct values', async () => {
    await sut.execute(input)

    expect(token.generate).toHaveBeenCalledTimes(1)
    expect(token.generate).toHaveBeenCalledWith({
      appId: 'anyAppId',
      secretKey: 'anySecretKey'
    })
  })

  test('should not call TokenGenerator if ApplicationRepository.authenticate returns false', async () => {
    repository.authenticate.mockResolvedValueOnce(false)

    await sut.execute(input)

    expect(token.generate).not.toHaveBeenCalled()
  })

  test('should return an token on success', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual({ token: 'anyToken' })
  })
})
