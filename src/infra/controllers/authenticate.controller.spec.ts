import { InputController } from '@/shared/types'
import { AuthenticateController } from './authenticate.controller'
import { mock } from 'jest-mock-extended'
import { AuthenticateApplicationUseCaseInterface } from '@/application/interfaces/authenticate-usecase.interface'

describe('AuthenticateController', () => {
  let sut: AuthenticateController
  let input: InputController

  const authenticateApplicationUseCase = mock<AuthenticateApplicationUseCaseInterface>()

  beforeEach(() => {
    sut = new AuthenticateController(authenticateApplicationUseCase)

    input = {
      body: {
        appId: 'anyAppId',
        secretKey: 'anySecretKey'
      }
    }

    authenticateApplicationUseCase.execute.mockResolvedValue({ token: 'anyToken' })
  })

  test('should return 400 if any required field is not provided', async () => {
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

  test('should call AuthenticateUseCase once with correct values', async () => {
    await sut.execute(input)

    expect(authenticateApplicationUseCase.execute).toHaveBeenCalledTimes(1)
    expect(authenticateApplicationUseCase.execute).toHaveBeenCalledWith(input.body)
  })

  test('should return an access token on success', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 200,
      body: { token: 'anyToken' }
    })
  })
})
