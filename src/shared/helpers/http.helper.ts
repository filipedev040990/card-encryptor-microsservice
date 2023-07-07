import { OutputController } from '@/shared/types'
import { UnauthorizedError, ForbiddenError } from '../errors'

export const success = (statusCode: number, body: any): OutputController => ({
  statusCode,
  body
})

export const badRequest = (error: Error): OutputController => ({
  statusCode: 400,
  body: error
})

export const unauthorized = (): OutputController => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const forbiddenError = (): OutputController => ({
  statusCode: 403,
  body: new ForbiddenError()
})

export const serverError = (error: Error): OutputController => ({
  statusCode: 500,
  body: error
})
