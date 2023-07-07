import { InputController, OutputController } from '@/shared/types'

export interface GeneralController {
  execute(input: InputController): Promise<OutputController>
}
