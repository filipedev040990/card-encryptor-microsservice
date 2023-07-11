import { InputController } from '@/shared/types'
import { AuthenticationMiddleware } from './authentication.middleware'
import { mock } from 'jest-mock-extended'
import { TokenInterface } from '@/application/interfaces/token.interface'

describe('AuthenticationMiddleware', () => {
  let sut: AuthenticationMiddleware
  let input: InputController

  const token = mock<TokenInterface>()

  beforeEach(() => {
    sut = new AuthenticationMiddleware(token)

    input = {
      headers: {
        authorization: 'Bearer XPTO'
      }
    }

    token.validate.mockResolvedValue('any Response')
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
})
