import { InputController } from '@/shared/types'
import { SaveCardController } from './save-card.controller'
import { MissingParamError, ServerError } from '@/shared/errors'
import { SaveCardUseCaseInterface } from '@/application/interfaces/save-card-usecase.interface'
import { mock } from 'jest-mock-extended'

describe('SaveCardController', () => {
  let sut: SaveCardController
  let input: InputController

  const saveCardUseCase = mock<SaveCardUseCaseInterface>()

  beforeEach(() => {
    sut = new SaveCardController(saveCardUseCase)

    input = {
      body: {
        brand: 'anyBrand',
        number: 'anyNumber',
        cvv: 'anyCvv',
        expiryMonth: 'anyExpiryMonth',
        expiryYear: 'anyExpiryYear'
      }
    }

    saveCardUseCase.execute.mockResolvedValue('anyIdentifier')
  })

  test('should return 400 if any required field is not provided', async () => {
    const requiredFields = ['brand', 'number', 'cvv', 'expiryMonth', 'expiryYear']

    for (const field of requiredFields) {
      const fieldBackup = input.body[field]
      input.body[field] = null

      const output = await sut.execute(input)

      expect(output).toEqual({
        statusCode: 400,
        body: new MissingParamError(field)
      })

      input.body[field] = fieldBackup
    }
  })

  test('should call SaveCardUseCase once and with correct values', async () => {
    await sut.execute(input)

    expect(saveCardUseCase.execute).toHaveBeenCalledTimes(1)
    expect(saveCardUseCase.execute).toHaveBeenCalledWith({
      brand: 'anyBrand',
      number: 'anyNumber',
      cvv: 'anyCvv',
      expiryMonth: 'anyExpiryMonth',
      expiryYear: 'anyExpiryYear'
    })
  })

  test('should return an identifier on success', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 201,
      body: {
        identifier: 'anyIdentifier'
      }
    })
  })

  test('should throw if SaveCardUseCase throws', async () => {
    saveCardUseCase.execute.mockImplementationOnce(() => { throw new Error() })

    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 500,
      body: new ServerError(new Error())
    })
  })
})
