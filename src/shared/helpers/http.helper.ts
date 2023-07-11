import { OutputController } from '@/shared/types'
import { UnauthorizedError, ForbiddenError, ServerError } from '../errors'

export const success = (statusCode: number, body: any): OutputController => ({
  statusCode,
  body
})

export const badRequest = (error: Error): OutputController => ({
  statusCode: 400,
  body: error.message
})

export const unauthorized = (): OutputController => ({
  statusCode: 401,
  body: new UnauthorizedError().message
})

export const forbiddenError = (): OutputController => ({
  statusCode: 403,
  body: new ForbiddenError().message
})

export const serverError = (error: Error): OutputController => ({
  statusCode: 500,
  body: new ServerError(error)
})
