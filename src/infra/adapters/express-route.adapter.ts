import { GeneralController } from '@/application/interfaces/general-controller.interface'
import { InputController } from '@/shared/types'
import { Request, Response } from 'express'
import { makeSaveRequestUseCase } from '../factories/usecases/save-request.factory'
import { makeUpdateRequestUseCase } from '../factories/usecases/update-request.factory'

export const expressRouteAdapter = (controller: GeneralController) => {
  return async (req: Request, res: Response) => {
    const saveRequestUseCase = makeSaveRequestUseCase()
    const updateRequestUseCase = makeUpdateRequestUseCase()

    const input: InputController = {
      originalUrl: req?.originalUrl,
      method: req?.method,
      headers: req?.headers,
      params: req?.params,
      body: req?.body,
      application: req?.application
    }

    const requestId = await saveRequestUseCase.execute({
      path: input.originalUrl,
      method: input.method as string,
      input: JSON.stringify(input)
    })

    const { statusCode, body } = await controller.execute(input)

    const output = statusCode > 199 && statusCode < 500 ? body : { error: body.message }

    await updateRequestUseCase.execute({ id: requestId, output: JSON.stringify(output), status: +statusCode })

    res.status(statusCode).json(output)
  }
}
