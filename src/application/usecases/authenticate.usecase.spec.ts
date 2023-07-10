import { AuthenticateApplicationUseCaseInterface } from '../interfaces/authenticate-usecase.interface'
import { AuthenticateApplicationUseCase } from './authenticate.usecase'
import { ApplicationRepositoryInterface } from '../interfaces/application-repository.interface'
import { mock } from 'jest-mock-extended'
import { TokenInterface } from '../interfaces/token.interface'
import { HashInterface } from '../interfaces/hash.interface'

describe('AuthenticateApplicationUseCase', () => {
  let sut: AuthenticateApplicationUseCase
  let input: AuthenticateApplicationUseCaseInterface.Input

  const repository = mock<ApplicationRepositoryInterface>()
  const token = mock<TokenInterface>()
  const hasher = mock<HashInterface>()

  beforeAll(() => {
    sut = new AuthenticateApplicationUseCase(repository, token, hasher)

    input = {
      appId: 'anyAppId',
      secretKey: 'anySecretKey'
    }

    repository.getByAppId.mockResolvedValue({
      id: 'anyId',
      appId: 'anyAppId',
      description: 'anyDescription',
      secretKey: 'hashedSecretKey'
    })

    token.generate.mockReturnValue('anyToken')
    hasher.compare.mockResolvedValue(true)
  })

  test('should call ApplicationRepository.getByAppId once and with correct values', async () => {
    await sut.execute(input)

    expect(repository.getByAppId).toHaveBeenCalledTimes(1)
    expect(repository.getByAppId).toHaveBeenCalledWith('anyAppId')
  })

  test('should return null if ApplicationRepository.getByAppId returns false', async () => {
    repository.getByAppId.mockResolvedValueOnce(null)

    const output = await sut.execute(input)

    expect(output).toBeNull()
  })

  test('should call encryptor once and with correct values', async () => {
    await sut.execute(input)

    expect(hasher.compare).toHaveBeenCalledTimes(1)
    expect(hasher.compare).toHaveBeenCalledWith('anySecretKey', 'hashedSecretKey')
  })

  test('should call TokenGenerator once and with correct values', async () => {
    await sut.execute(input)

    expect(token.generate).toHaveBeenCalledTimes(1)
    expect(token.generate).toHaveBeenCalledWith({
      appId: 'anyAppId',
      secretKey: 'anySecretKey'
    })
  })

  test('should not call TokenGenerator if ApplicationRepository.getByAppId returns false', async () => {
    repository.getByAppId.mockResolvedValueOnce(null)

    await sut.execute(input)

    expect(token.generate).not.toHaveBeenCalled()
  })

  test('should return an token on success', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual({ token: 'anyToken' })
  })
})
