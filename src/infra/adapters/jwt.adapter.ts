import { TokenInterface } from '@/application/interfaces/token.interface'
import jwt from 'jsonwebtoken'

export class JWTAdapter implements TokenInterface {
  constructor (
    private readonly secretKey: string,
    private readonly expirationInMs: number
  ) {}

  generate (data: any): string {
    return jwt.sign({ data }, this.secretKey, { expiresIn: this.expirationInMs })
  }

  validate (token: string): any {
    return jwt.verify(
      token,
      this.secretKey,
      (error, response) => {
        if (error) {
          return null
        }

        return response
      }
    )
  }
}
