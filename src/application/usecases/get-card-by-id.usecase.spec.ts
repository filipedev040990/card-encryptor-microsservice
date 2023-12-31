import { mock } from 'jest-mock-extended'
import { GetCardByIdUseCase } from './get-card-by-id.usecase'
import { CardRepositoryInterface } from '@/application/interfaces/card-repository.interface'
import { CryptographyInterface } from '@/application/interfaces/cryptography.interface'

describe('GetCardUseCase', () => {
  let sut: GetCardByIdUseCase

  const repository = mock<CardRepositoryInterface>()
  const cryptography = mock<CryptographyInterface>()

  beforeAll(() => {
    sut = new GetCardByIdUseCase(repository, cryptography)

    repository.getById.mockResolvedValue('encryptedCard')

    cryptography.decrypt.mockReturnValue({
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

  test('should call Cryptography decrypt once and with correct values', async () => {
    await sut.execute('anyId')

    expect(cryptography.decrypt).toHaveBeenCalledTimes(1)
    expect(cryptography.decrypt).toHaveBeenCalledWith('encryptedCard')
  })

  test('should return null if CardRepository.getbyId returns null', async () => {
    repository.getById.mockResolvedValueOnce(null)

    const output = await sut.execute('anyId')

    expect(output).toBeNull()
  })

  test('should return null if Cryptography decrypt returns null', async () => {
    cryptography.decrypt.mockReturnValueOnce(null)

    const output = await sut.execute('anyId')

    expect(output).toBeNull()
  })

  test('should return an decrypted card data', async () => {
    const output = await sut.execute('anyId')

    expect(output).toEqual({
      brand: 'anyBrand',
      number: 'anyNumber',
      cvv: 'anyCvv',
      expiryMonth: 'anyExpiryMont',
      expiryYear: 'anyExpieryYear'
    })
  })
})
