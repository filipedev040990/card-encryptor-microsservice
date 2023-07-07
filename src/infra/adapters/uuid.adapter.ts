import { UUIDGeneratorInterface } from '@/application/interfaces/uuid-generator.interface'
import { randomUUID } from 'crypto'

export class UUIDGenerator implements UUIDGeneratorInterface {
  execute (): string {
    return randomUUID()
  }
}
