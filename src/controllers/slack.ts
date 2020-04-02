import { OK, BAD_REQUEST } from 'http-status-codes'
import { Context } from 'koa'
import winston from 'winston'
import slackService from '@services/slack.service'

export default {
  botEvent: (ctx: Context) => {
    const { challenge } = ctx.request.body

    if (!challenge) {
      if (ctx.request.body.event) {
        const {
          type,
          text,
          channel,
        }: {
          type: string
          text: string
          channel: string
        } = ctx.request.body.event

        if (type === 'message') {
          let responseText: string | undefined

          if (text.includes(`start`)) {
            responseText = 'Você começou!'
          }

          if (responseText) {
            try {
              slackService.sendMessage(responseText, channel)
            } catch (error) {
              winston.log(
                'error',
                `Não foi possível enviar a mensagem para o canal. Erro: ${error.message}`
              )
            }
          }
        }
      }

      ctx.status = OK
    } else {
      ctx.status = OK
      ctx.body = { challenge }
    }
  },
}
