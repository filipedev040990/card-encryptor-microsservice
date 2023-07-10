import { HashInterface } from '@/application/interfaces/hash.interface'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements HashInterface {
  async compare (value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash)
  }
}
