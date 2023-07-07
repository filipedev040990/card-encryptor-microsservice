export interface DeleteCardUseCaseInterface {
  execute(id: string): Promise<void>
}
