import { GeneralController } from '@/application/interfaces/general-controller.interface'
import { InputController } from '@/shared/types'
import { Request, Response } from 'express'

export const expressRouteAdapter = (controller: GeneralController) => {
  return async (req: Request, res: Response) => {
    const input: InputController = {
      body: req?.body,
      params: req?.params,
      headers: req?.headers
    }

    const { statusCode, body } = await controller.execute(input)
    const output = statusCode > 199 && statusCode < 500 ? body : { error: body.message }

    res.status(statusCode).json(output)
  }
}
