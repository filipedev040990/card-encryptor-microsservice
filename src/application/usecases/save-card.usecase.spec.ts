import { SaveCardUseCaseInterface } from '../interfaces/save-card-usecase.interface'
import { SaveCardUseCase } from './save-card.usecase'
import MockDate from 'mockdate'
import { mock } from 'jest-mock-extended'
import { EncryptDataInterface } from '../interfaces/encrypt-data.interface'

describe('SaveCardUseCase', () => {
  let sut: SaveCardUseCase
  let input: SaveCardUseCaseInterface.Input

  const encryptoAdapter = mock<EncryptDataInterface>()

  beforeAll(() => {
    MockDate.set(new Date())

    sut = new SaveCardUseCase(encryptoAdapter)

    input = {
      brand: 'anyBrand',
      number: 'anyNumber',
      cvv: 'anyCvv',
      expiryMonth: 'anyExpiryMonth',
      expiryYear: 'anyExpiryYear'
    }

    encryptoAdapter.execute.mockReturnValue('aanyEncryptedData')
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call EncryptoAdapter once and with correct values', async () => {
    await sut.execute(input)

    expect(encryptoAdapter.execute).toHaveBeenCalledTimes(1)
    expect(encryptoAdapter.execute).toHaveBeenCalledWith(input)
  })
})
