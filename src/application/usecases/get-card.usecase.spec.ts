import { mock } from 'jest-mock-extended'
import { GetCardByIdUseCase } from './get-card.usecase'
import { CardRepositoryInterface } from '../interfaces/card-repository.interface'

describe('GetCardUseCase', () => {
  let sut: GetCardByIdUseCase

  const repository = mock<CardRepositoryInterface>()

  beforeAll(() => {
    sut = new GetCardByIdUseCase(repository)

    repository.getById.mockResolvedValue({
      brand: 'anyBrand',
      number: 'anyNumber',
      cvv: 'anyCvv',
      expiryMonth: 'anyExpiryMont',
      expiryYear: 'anyExpieryYear'
    })
  })

  test('should call CardRepository.getbyId once and with correct id', async () => {
    await sut.execute('anyId')

    expect(repository.getById).toHaveBeenCalledTimes(1)
    expect(repository.getById).toHaveBeenCalledWith('anyId')
  })
})
