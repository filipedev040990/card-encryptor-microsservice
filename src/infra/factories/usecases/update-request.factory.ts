import { UpdateRequestUseCase } from '@/application/usecases/update-request.usecase'
import { RequestRepository } from '@/infra/database/repositories/request.repository'

export const makeUpdateRequestUseCase = (): UpdateRequestUseCase => {
  const requestRepository = new RequestRepository()
  return new UpdateRequestUseCase(requestRepository)
}
