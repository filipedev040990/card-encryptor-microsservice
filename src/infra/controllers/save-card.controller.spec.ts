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

  test('should return 400 if card brand is not provided', async () => {
    input.body.brand = null

    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 400,
      body: new MissingParamError('brand')
    })
  })
})
