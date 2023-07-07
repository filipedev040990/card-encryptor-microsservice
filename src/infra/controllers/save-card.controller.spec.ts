import { InputController } from '@/shared/types'
import { SaveCardController } from './save-card.controller'
import { MissingParamError } from '@/shared/errors'

describe('SaveCardController', () => {
  let sut: SaveCardController
  let input: InputController

  beforeEach(() => {
    sut = new SaveCardController()

    input = {
      body: {
        brand: 'anyBrand',
        number: 'anyNumber',
        cvv: 'anyCvv',
        expiryMonth: 'anyExpiryMonth',
        expiryYear: 'anyExpiryYear'
      }
    }
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
})
