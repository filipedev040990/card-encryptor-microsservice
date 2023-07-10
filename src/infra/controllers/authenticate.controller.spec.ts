import { InputController } from '@/shared/types'
import { AuthenticateController } from './authenticate.controller'

describe('AuthenticateController', () => {
  let sut: AuthenticateController
  let input: InputController

  beforeEach(() => {
    sut = new AuthenticateController()

    input = {
      body: {
        appId: 'anyAppId',
        secretKey: 'anySecretKey'
      }
    }
  })

  test('should return 400 if appId is not provided', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 400,
      body: 'Missing param: appId'
    })
  })
})
