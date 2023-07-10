import { ApplicationRepositoryInterface } from '@/application/interfaces/application-repository.interface'
import { prismaClient } from '../prisma-client'

export class ApplicationRepository implements ApplicationRepositoryInterface {
  async getByAppId (appId: string): Promise<ApplicationRepositoryInterface.Output | null> {
    const application = await prismaClient.applications.findFirst({ where: { appId } })
    return application ?? null
  }
}
