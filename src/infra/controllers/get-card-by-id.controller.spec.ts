import { InputController } from '@/shared/types'
import { GetCardByIdController } from './get-card-by-id.controller'
import { MissingParamError } from '@/shared/errors'
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
})
