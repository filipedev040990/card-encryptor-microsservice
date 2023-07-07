import { CardRepositoryInterface } from '@/application/interfaces/card-repository.interface'
import { prismaClient } from '../prisma-client'

export class CardRepository implements CardRepositoryInterface {
  async save (data: CardRepositoryInterface.Input): Promise<void> {
    await prismaClient.cards.create({ data })
  }

  async delete (id: string): Promise<void> {
    await prismaClient.cards.delete({ where: { id } })
  }

  async getById (id: string): Promise<string | null> {
    const card = await prismaClient.cards.findFirst({ where: { id } })
    return card ? card.encryptedCard : null
  }
}
