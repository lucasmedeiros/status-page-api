import winston from 'winston'
import fetch from 'node-fetch'
import {
  WebClient,
  WebAPICallResult,
  ChatPostMessageArguments,
} from '@slack/web-api'

import config from '../config'

const web = new WebClient(config.slack.botUserToken)

interface ChatPostMessageResult extends WebAPICallResult {
  channel: string
  ts: string
  message: {
    text: string
  }
}

const callWebhook = (
  messageArguments: Omit<ChatPostMessageArguments, 'channel'>
) => {
  fetch(config.slack.webhookUrl as string, {
    body: JSON.stringify(messageArguments),
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
  })
}

export default {
  sendMessage: async (messageArguments: ChatPostMessageArguments) => {
    const res = (await web.chat.postMessage(
      messageArguments
    )) as ChatPostMessageResult

    winston.log(
      'info',
      `A message was post to conversation ${res.channel} with id ${res.ts} wich contains the message ${res.message}`
    )
  },

  notifyNewOccurrence: async ({
    component,
    incident,
  }: {
    component: ComponentBody
    incident: IncidentBody
  }) => {
    callWebhook({
      text: 'NEW OCCURRENCE :warning:',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: 'NEW OCCURRENCE :warning:',
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*${component.name}* is under *${incident.name}*!`,
          },
        },
      ],
    })
  },

  notifyCloseOccurrence: async ({
    component,
    incident,
  }: {
    component: ComponentBody
    incident: IncidentBody
  }) => {
    callWebhook({
      text: 'OCCURRENCE CLOSED :heavy_check_mark:',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: 'OCCURRENCE CLOSED :heavy_check_mark:',
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*${component.name}* is no longer under *${incident.name}*!`,
          },
        },
      ],
    })
  },

  notifyUpdateOccurrence: async ({
    component,
    incident,
    step,
  }: {
    component: ComponentBody
    incident: IncidentBody
    step: OccurrenceStepBody
  }) => {
    callWebhook({
      text: 'OCCURRENCE UPDATED :construction_worker:',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: 'OCCURRENCE UPDATED :construction_worker:',
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*${incident.name}* on *${component.name}* had an update!`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `${step.description}`,
          },
        },
      ],
    })
  },
}
