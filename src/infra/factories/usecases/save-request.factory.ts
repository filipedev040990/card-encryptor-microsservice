import { SaveRequestUseCase } from '@/application/usecases/save-request.usecase'
import { UUIDGenerator } from '@/infra/adapters/uuid.adapter'
import { RequestRepository } from '@/infra/database/repositories/request.repository'

export const makeSaveRequestUseCase = (): SaveRequestUseCase => {
  const uuidGenerator = new UUIDGenerator()
  const requestRepository = new RequestRepository()
  return new SaveRequestUseCase(uuidGenerator, requestRepository)
}
