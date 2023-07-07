import { InputController } from '@/shared/types'
import { GetCardByIdController } from './get-card-by-id.controller'
import { InvalidParamError, MissingParamError, ServerError } from '@/shared/errors'
import { GetCardByIdUseCaseInterface } from '@/application/interfaces/get-card-by-idusecase.interface'
import { mock } from 'jest-mock-extended'

describe('GetCardByIdController', () => {
  let sut: GetCardByIdController
  let input: InputController

  const getCardByIdUseCase = mock<GetCardByIdUseCaseInterface>()

  beforeEach(() => {
    sut = new GetCardByIdController(getCardByIdUseCase)

    input = {
      params: {
        id: 'anyCardId'
      }
    }

    getCardByIdUseCase.execute.mockResolvedValue({
      brand: 'anyBrand',
      number: 'anyNumber',
      cvv: 'anyCvv',
      expiryMonth: 'anyExpiryMont',
      expiryYear: 'anyExpieryYear'
    })
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

  test('should call GetCardByIdUseCase once and with correct id', async () => {
    await sut.execute(input)

    expect(getCardByIdUseCase.execute).toHaveBeenCalledTimes(1)
    expect(getCardByIdUseCase.execute).toHaveBeenCalledWith('anyCardId')
  })

  test('should return 400 if GetCardByIdUseCase returns null', async () => {
    getCardByIdUseCase.execute.mockResolvedValueOnce(null)

    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 400,
      body: new InvalidParamError('id')
    })
  })

  test('should return an decrypted card data', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 200,
      body: {
        brand: 'anyBrand',
        number: 'anyNumber',
        cvv: 'anyCvv',
        expiryMonth: 'anyExpiryMont',
        expiryYear: 'anyExpieryYear'
      }
    })
  })

  test('should throw if GetCardByIdUseCase throws', async () => {
    getCardByIdUseCase.execute.mockImplementationOnce(() => { throw new Error() })

    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 500,
      body: new ServerError(new Error())
    })
  })
})
