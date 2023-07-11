import { InputController } from '@/shared/types'
import { AuthenticationMiddleware } from './authentication.middleware'
import { mock } from 'jest-mock-extended'
import { TokenInterface } from '@/application/interfaces/token.interface'
import { ApplicationRepositoryInterface } from '@/application/interfaces/application-repository.interface'

describe('AuthenticationMiddleware', () => {
  let sut: AuthenticationMiddleware
  let input: InputController

  const token = mock<TokenInterface>()
  const repository = mock<ApplicationRepositoryInterface>()

  beforeEach(() => {
    sut = new AuthenticationMiddleware(token, repository)

    input = {
      headers: {
        authorization: 'Bearer XPTO'
      }
    }

    token.validate.mockResolvedValue({
      appId: 'anyAppId',
      secretKey: 'hashedSecretKey'
    })

    repository.getByAppId.mockResolvedValue({
      id: 'anyId',
      appId: 'anyAppId',
      description: 'anyDescription',
      secretKey: 'hashedSecretKey'
    })
  })

  test('should return 403 if Auhtorization header is not provided', async () => {
    input.headers = null

    const output = await sut.execute(input)

    expect(output).toEqual({ statusCode: 403, body: 'Forbidden: JWT is required' })
  })

  test('should return 403 if Auhtorization header is falsy', async () => {
    input = null as any

    const output = await sut.execute(input)

    expect(output).toEqual({ statusCode: 403, body: 'Forbidden: JWT is required' })
  })

  test('should call Token.validate once and with correct token', async () => {
    await sut.execute(input)

    expect(token.validate).toHaveBeenCalledTimes(1)
    expect(token.validate).toHaveBeenCalledWith('XPTO')
  })

  test('should return 401 if Auhtorization fails', async () => {
    token.validate.mockResolvedValueOnce(null)

    const output = await sut.execute(input)

    expect(output).toEqual({ statusCode: 401, body: 'Unauthorized' })
  })

  test('should call ApplicationsRepository.getByAppId retuonce and with correct appId', async () => {
    await sut.execute(input)

    expect(repository.getByAppId).toHaveBeenCalledTimes(1)
    expect(repository.getByAppId).toHaveBeenCalledWith('anyAppId')
  })
})
