import { InputController } from '@/shared/types'
import { DeleteCardController } from './delete-card.controller'
import { ServerError } from '@/shared/errors'
import { DeleteCardUseCaseInterface } from '@/application/interfaces/delete-card-usecase.interface'
import { mock } from 'jest-mock-extended'

describe('DeleteCardController', () => {
  let sut: DeleteCardController
  let input: InputController

  const deleteCardUseCase = mock<DeleteCardUseCaseInterface>()

  beforeEach(() => {
    sut = new DeleteCardController(deleteCardUseCase)

    input = {
      params: {
        id: 'anyCardId'
      }
    }
  })

  test('should call deleteCardUseCase once and with correct id', async () => {
    await sut.execute(input)

    expect(deleteCardUseCase.execute).toHaveBeenCalledTimes(1)
    expect(deleteCardUseCase.execute).toHaveBeenCalledWith('anyCardId')
  })

  test('should throw if deleteCardUseCase throws', async () => {
    deleteCardUseCase.execute.mockImplementationOnce(() => { throw new Error() })

    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 500,
      body: new ServerError(new Error())
    })
  })

  test('should return null on delete', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 200,
      body: null
    })
  })
})
