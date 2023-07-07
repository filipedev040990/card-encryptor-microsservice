import { CardRepositoryInterface } from '../interfaces/card-repository.interface'
import { DeleteCardUseCase } from './delete-card.usecase'
import { mock } from 'jest-mock-extended'

describe('DeleteCardUseCase', () => {
  let sut: DeleteCardUseCase
  let id: string

  const repository = mock<CardRepositoryInterface>()

  beforeAll(() => {
    sut = new DeleteCardUseCase(repository)
  })

  test('should call CardRepository.delete once and with correct id', async () => {
    await sut.execute(id)

    expect(repository.delete).toHaveBeenCalledTimes(1)
    expect(repository.delete).toHaveBeenCalledWith(id)
  })
})
