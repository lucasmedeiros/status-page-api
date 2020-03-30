import { OK } from 'http-status-codes'
import service from '@services/component.service'
import { BaseContext } from 'koa'

export default {
  get: async (ctx: BaseContext) => {
    const component = await service.get()
    ctx.status = OK
    ctx.body = component
  },
}
