import { Response, NextFunction } from 'express'
import {
  OK,
  CREATED,
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} from 'http-status-codes'

const handleSuccessfulRequest = (res: Response, content: any) =>
  res.json(content)

const handleErrorOnRequest = (
  res: Response,
  message: string,
  next: NextFunction
) => {
  if (next) return next(new Error(message))
  return res.json({ message })
}

export default {
  ok(res: Response, content: any = {}) {
    res.status(OK)
    return handleSuccessfulRequest(res, content)
  },

  created(res: Response, content: any) {
    res.status(CREATED)
    return handleSuccessfulRequest(res, content)
  },

  badRequest(res: Response, message: string, next: NextFunction) {
    res.status(BAD_REQUEST)
    return handleErrorOnRequest(res, message, next)
  },

  unauthorized(res: Response, message: string, next: NextFunction) {
    res.status(UNAUTHORIZED)
    return handleErrorOnRequest(res, message, next)
  },

  notFound(res: Response, message: string, next: NextFunction) {
    res.status(NOT_FOUND)
    return handleErrorOnRequest(res, message, next)
  },

  internalError(res: Response, message: string, next: NextFunction) {
    res.status(INTERNAL_SERVER_ERROR)
    return handleErrorOnRequest(res, message, next)
  },
}
