import { Context } from 'koa'
import OccurenceController from '@controllers/occurrence'
import { OK } from 'http-status-codes'

const occurrenceController = new OccurenceController()

export default {
  get: async (ctx: Context) => {
    const occurrences = await occurrenceController.getByActive()

    let status: string

    if (occurrences.length) {
      status = 'UNHEALTHY'
    } else {
      status = 'HEALTHY'
    }

    ctx.status = OK
    ctx.body = {
      status,
      occurrences,
    }
  },
}
