import { AuthenticationMiddleware } from '@/application/interfaces/authentication-middleware.interface'
import { InputController } from '@/shared/types'
import { NextFunction, Request, Response } from 'express'

export const expressMiddlewareAdapter = (middleware: AuthenticationMiddleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const input: InputController = {
      headers: req.headers
    }

    const { statusCode, body } = await middleware.execute(input)

    if (statusCode >= 200 && statusCode <= 399) {
      req.application = body
      return next()
    }

    res.status(statusCode).json({ error: body.message })
  }
}
