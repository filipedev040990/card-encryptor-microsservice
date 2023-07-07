export interface CryptographyInterface {
  encrypt(input: any): string
  decrypt(input: string): any
}
