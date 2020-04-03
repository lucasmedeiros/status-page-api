import { OK } from 'http-status-codes'
import { Context } from 'koa'
import winston from 'winston'
import slackService from '@services/slack.service'

const start = (channel: string) => {
  slackService.sendMessage({
    text: 'Olá, como posso ajudá-lo?',
    channel,
    attachments: [
      {
        fallback: 'Algum erro aconteceu na seleção',
        callback_id: 'start_option',
        color: '#3AA3E3',
        actions: [
          {
            name: 'startoption',
            text: 'Ajuda',
            type: 'button',
            value: 'help',
          },
          {
            name: 'startoption',
            text: 'Criar um incidente',
            style: 'danger',
            type: 'button',
            value: 'incident',
            confirm: {
              title: 'Deseja realmente criar um incidente?',
              text: 'Isso irá notificar todo o canal #test-bot-lucas-medeiros',
              ok_text: 'Sim, tenho certeza',
              dismiss_text: 'Cancelar',
            },
          },
        ],
      },
    ],
  })
}

export default {
  botEvent: async (ctx: Context) => {
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
          try {
            if (text === 'start') {
              start(channel)
            }
          } catch (error) {
            winston.log(
              'error',
              `Couldn't send message to channel. Error: ${error.message}`
            )
          }
        }
      }

      ctx.status = OK
    } else {
      ctx.status = OK
      ctx.body = { challenge }
    }
  },

  actions: async (ctx: Context) => {
    // const { payload } = ctx.request.body

    // const action = JSON.parse(payload)

    // if (
    //   action.type === 'interactive_message' &&
    //   action.callback_id === 'start_option'
    // ) {

    // }

    ctx.status = OK
  },
}
