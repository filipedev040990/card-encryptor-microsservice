import { InputController } from '@/shared/types'
import { GetCardByIdController } from './get-card-by-id.controller'
import { MissingParamError } from '@/shared/errors'

describe('GetCardByIdController', () => {
  let sut: GetCardByIdController
  let input: InputController

  beforeEach(() => {
    sut = new GetCardByIdController()

    input = {
      params: {
        id: 'anyCardId'
      }
    }
  })

  test('should return 400 if id is not provided', async () => {
    input.params.id = null

    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 400,
      body: new MissingParamError('id')
    })
  })

  test('should return 400 if params is not provided', async () => {
    input = null as any

    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 400,
      body: new MissingParamError('id')
    })
  })
})
