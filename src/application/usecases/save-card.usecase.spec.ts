import { SaveCardUseCaseInterface } from '../interfaces/save-card-usecase.interface'
import { SaveCardUseCase } from './save-card.usecase'
import MockDate from 'mockdate'
import { mock } from 'jest-mock-extended'
import { UUIDGeneratorInterface } from '../interfaces/uuid-generator.interface'
import { CardRepositoryInterface } from '../interfaces/card-repository.interface'
import { CryptographyInterface } from '../interfaces/cryptography.interface'

describe('SaveCardUseCase', () => {
  let sut: SaveCardUseCase
  let input: SaveCardUseCaseInterface.Input

  const encryptoAdapter = mock<CryptographyInterface>()
  const uuidGenerator = mock<UUIDGeneratorInterface>()
  const repository = mock<CardRepositoryInterface>()

  beforeAll(() => {
    MockDate.set(new Date())

    sut = new SaveCardUseCase(encryptoAdapter, uuidGenerator, repository)

    input = {
      brand: 'anyBrand',
      number: 'anyNumber',
      cvv: 'anyCvv',
      expiryMonth: 'anyExpiryMonth',
      expiryYear: 'anyExpiryYear'
    }

    encryptoAdapter.encrypt.mockReturnValue('aanyEncryptedData')
    uuidGenerator.execute.mockReturnValue('anyUUID')
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call EncryptoAdapter once and with correct values', async () => {
    await sut.execute(input)

    expect(encryptoAdapter.encrypt).toHaveBeenCalledTimes(1)
    expect(encryptoAdapter.encrypt).toHaveBeenCalledWith(input)
  })

  test('should call UUIDGenerator once', async () => {
    await sut.execute(input)

    expect(uuidGenerator.execute).toHaveBeenCalledTimes(1)
  })

  test('should call CardRepository.save once and with correct values', async () => {
    await sut.execute(input)

    expect(repository.save).toHaveBeenCalledTimes(1)
    expect(repository.save).toHaveBeenCalledWith({
      id: 'anyUUID',
      encryptedCard: 'aanyEncryptedData',
      createdAt: new Date()
    })
  })

  test('should return a card identifier on success', async () => {
    const output = await sut.execute(input)

    expect(output).toBe('anyUUID')
  })
})
