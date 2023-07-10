export interface TokenInterface {
  generate (input: any): string
  validate (token: string): any
}
