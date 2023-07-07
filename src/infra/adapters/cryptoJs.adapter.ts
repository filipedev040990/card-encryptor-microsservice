import { CryptographyInterface } from '@/application/interfaces/cryptography.interface'
import * as CryptoJS from 'crypto-js'

export class CryptoJsAdapter implements CryptographyInterface {
  constructor (private readonly key: string) {}
  encrypt (input: any): string {
    return CryptoJS.AES.encrypt(JSON.stringify(input), this.key).toString()
  }

  decrypt (input: string): any {
    const bytes = CryptoJS.AES.decrypt(input, this.key)
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  }
}
