import { OK } from 'http-status-codes'
import service from '@services/component.service'
import { evaluateResult } from '@utils/dbResult'
import { Context } from 'koa'

export default {
  get: async (ctx: Context) => {
    const component = await service.get()
    ctx.status = OK
    ctx.body = component
  },

  getOne: async (ctx: Context) => {
    const { id } = ctx.params

    const result = await service.getOne(id)

    ctx.status = result.status
    ctx.body = evaluateResult(result)
  },

  create: async (ctx: Context) => {
    const result = await service.create(ctx.request.body)
    ctx.status = result.status
    ctx.body = evaluateResult(result)
  },

  update: async (ctx: Context) => {
    const { id } = ctx.params

    const result = await service.update(id, ctx.request.body)

    ctx.status = result.status
    ctx.body = evaluateResult(result)
  },
}
