import { OK } from 'http-status-codes'
import { Context } from 'koa'
import winston from 'winston'
import slackService from '@services/slack.service'

import ComponentController from './component'
import IncidentController from './incident'
import OccurenceController from './occurrence'

const handleCreateNewOccurrence = async ({
  text,
  channel,
}: {
  text: string
  channel: string
}) => {
  const splitted = text.split(' ')
  if (splitted.length < 4) slackService.invalidCommand(channel)
  else {
    const componentController = new ComponentController()
    const incidentController = new IncidentController()

    componentController.getOne(+splitted[1]).then(component => {
      if (component.isError)
        slackService.invalidCommand(channel, component.error.message)
      else {
        incidentController.getOne(+splitted[2]).then(incident => {
          if (incident.isError)
            slackService.invalidCommand(channel, incident.error.message)
          else {
            const occurrenceController = new OccurenceController()
            occurrenceController
              .create({
                active: true,
                componentId: component.value.id,
                incidentId: incident.value.id,
                description: splitted
                  .map((object, index) => (index > 2 ? object : null))
                  .join(' '),
              })
              .then(occurrence => {
                if (occurrence.isError)
                  slackService.invalidCommand(channel, occurrence.error.message)
                else {
                  slackService.sendMessage({
                    text: 'Occurrence successfully created',
                    channel,
                  })
                }
              })
          }
        })
      }
    })
  }
}

const handleCloseOccurrence = async ({
  text,
  channel,
}: {
  text: string
  channel: string
}) => {
  const splitted = text.split(' ')
  if (splitted.length !== 2) slackService.invalidCommand(channel)
  else {
    const occurrenceController = new OccurenceController()

    occurrenceController
      .update(+splitted[1], { active: false })
      .then(occurrence => {
        if (occurrence.isError)
          slackService.invalidCommand(channel, occurrence.error.message)
        else {
          slackService.sendMessage({
            text: 'Occurrence successfully closed',
            channel,
          })
        }
      })
  }
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
              slackService.showMenu(channel)
            }

            if (text.startsWith('new')) {
              handleCreateNewOccurrence({ text, channel })
            } else if (text.startsWith('close')) {
              handleCloseOccurrence({ text, channel })
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
    let body

    const { payload } = ctx.request.body

    const action = JSON.parse(payload)

    if (
      action.type === 'interactive_message' &&
      action.callback_id === 'start_option'
    ) {
      body = await slackService.handleStartAction(action.actions[0])
    }

    ctx.status = OK
    ctx.body = body ?? ''
  },
}
