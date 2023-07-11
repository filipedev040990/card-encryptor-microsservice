import { InputController } from '@/shared/types'
import { AuthenticationMiddleware } from './authentication.middleware'

describe('AuthenticationMiddleware', () => {
  let sut: AuthenticationMiddleware
  let input: InputController

  beforeEach(() => {
    sut = new AuthenticationMiddleware()

    input = {
      headers: {
        authorization: 'Bearer XPTO'
      }
    }
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
})
