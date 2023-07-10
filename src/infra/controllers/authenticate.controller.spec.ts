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

  test('should return 400 if anhy required field is not provided', async () => {
    const requiredFields = ['appId', 'secretKey']

    for (const field of requiredFields) {
      const fieldBackup = input.body[field]

      input.body[field] = null

      const output = await sut.execute(input)

      expect(output).toEqual({
        statusCode: 400,
        body: `Missing param: ${field}`
      })

      input.body[field] = fieldBackup
    }
  })
})
