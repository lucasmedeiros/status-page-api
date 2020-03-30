import Koa from 'koa'
import winston from 'winston'

import config from './config'

export function logger(winstonInstance: typeof winston) {
  winstonInstance.configure({
    level: config.debugLogging ? 'debug' : 'info',
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        ),
      }),
    ],
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (ctx: Koa.Context, next: () => Promise<any>) => {
    const start = new Date().getTime()

    await next()

    const ms = new Date().getTime() - start

    let logLevel = 'info'
    if (ctx.status >= 500) {
      logLevel = 'error'
    } else if (ctx.status >= 400) {
      logLevel = 'warn'
    } else if (ctx.status >= 100) {
      logLevel = 'info'
    }

    const msg = `${ctx.method} ${ctx.originalUrl} ${ctx.status} ${ms}ms`

    winstonInstance.log(logLevel, msg)
  }
}
