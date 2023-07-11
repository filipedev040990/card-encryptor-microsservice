import { SaveRequestRepositoryInterface } from '@/application/interfaces/save-request-repository.interface'
import { UpdateRequestRepositoryInterface } from '@/application/interfaces/update-request-repository.interface'
import { prismaClient } from '../prisma-client'

export class RequestRepository implements SaveRequestRepositoryInterface, UpdateRequestRepositoryInterface {
  async save (input: SaveRequestRepositoryInterface.Input): Promise<string> {
    const newRequest = await prismaClient.request.create({
      data: {
        id: input.id,
        path: input.path,
        method: input.method,
        input: input.input,
        createdAt: input.createdAt
      }
    })

    return newRequest.id
  }

  async update (input: UpdateRequestRepositoryInterface.Input): Promise<void> {
    await prismaClient.request.update({
      data: {
        status: input.status,
        output: input.output,
        updatedAt: input.updatedAt
      },
      where: { id: input.id }
    })
  }
}
