export interface HashInterface {
  compare (value: string, hash: string): Promise<boolean>
}
