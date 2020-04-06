import { Context } from 'koa'
import OccurenceController from '@controllers/occurrence'
import { OK } from 'http-status-codes'

const occurrenceController = new OccurenceController()

export default {
  get: async (ctx: Context) => {
    const occurrences = await occurrenceController.getByActive()

    ctx.status = OK
    ctx.body = {
      healty: occurrences.length === 0,
      occurrences,
    }
  },
}
