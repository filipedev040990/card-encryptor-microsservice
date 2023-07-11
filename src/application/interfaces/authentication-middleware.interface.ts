import { InputController, OutputController } from '@/shared/types'

export interface AuthenticationMiddleware {
  execute (input: InputController): Promise<OutputController>
}
