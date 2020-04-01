import { Model } from 'sequelize/types'
import { Context } from 'koa'
import { OK } from 'http-status-codes'

export const dbOk = <T, E>(value: T, status: number): DatabaseResult<T, E> => ({
  isError: false,
  status,
  value,
})

export const dbErr = <T, E>(err: E, status: number): DatabaseResult<T, E> => ({
  isError: true,
  error: err,
  status,
})

export const evaluateResult = <T>(
  result: DatabaseResult<T, Error>
): T | ErrorResponse => {
  return result.isError ? { message: result.error.message } : result.value
}

class Handler<B> {
  public controller: Controller<Model, B, Error>

  constructor(controller: Controller<Model, B, Error>) {
    this.controller = controller
  }

  public get = async (ctx: Context) => {
    const result = await this.controller.get()
    ctx.status = OK
    ctx.body = result
  }

  public getOne = async (ctx: Context) => {
    const { id } = ctx.params

    const result = await this.controller.getOne(id)

    ctx.status = result.status
    ctx.body = evaluateResult(result)
  }

  public create = async (ctx: Context) => {
    const body = ctx.request.body as B

    const result = await this.controller.create(body)

    ctx.status = result.status
    ctx.body = evaluateResult(result)
  }

  public update = async (ctx: Context) => {
    const { id } = ctx.params
    const body = ctx.request.body as B

    const result = await this.controller.update(id, body)

    ctx.status = result.status
    ctx.body = evaluateResult(result)
  }

  public del = async (ctx: Context) => {
    const { id } = ctx.params

    const result = await this.controller.del(id)

    ctx.status = result.status
    ctx.body = evaluateResult(result)
  }
}

export default Handler
