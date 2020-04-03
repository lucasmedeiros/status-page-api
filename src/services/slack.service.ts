import winston from 'winston'
import fetch from 'node-fetch'
import {
  WebClient,
  WebAPICallResult,
  ChatPostMessageArguments,
  PlainTextElement,
  MrkdwnElement,
} from '@slack/web-api'
import ComponentController from '@controllers/component'
import IncidentController from '@controllers/incident'

import config from '../config'

const web = new WebClient(config.slack.botUserToken)

interface ChatPostMessageResult extends WebAPICallResult {
  channel: string
  ts: string
  message: {
    text: string
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const callWebhook = (messageArguments: any) => {
  fetch(config.slack.webhookUrl as string, {
    body: JSON.stringify(messageArguments),
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
  })
}

export default {
  async sendMessage(messageArguments: ChatPostMessageArguments) {
    const res = (await web.chat.postMessage(
      messageArguments
    )) as ChatPostMessageResult

    winston.log(
      'info',
      `A message was post to conversation ${res.channel} with id ${res.ts} wich contains the message ${res.message}`
    )
  },

  showMenu(channel: string) {
    this.sendMessage({
      text: 'Hello, how may I help you?',
      channel,
      attachments: [
        {
          fallback: 'Some error occurred on selecting...',
          callback_id: 'start_option',
          color: '#3AA3E3',
          actions: [
            {
              name: 'startoption',
              text: 'Create occurrence',
              type: 'button',
              value: 'incident',
            },
            {
              name: 'startoption',
              text: 'Update occurrence',
              type: 'button',
              value: 'update',
            },
            {
              name: 'startoption',
              text: 'Help',
              type: 'button',
              value: 'help',
            },
          ],
        },
      ],
    })
  },

  invalidCommand(channel: string, text = 'Invalid command, please try again.') {
    this.sendMessage({
      text: ` :no_entry: *ERROR* :no_entry: `,
      channel,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: ` :no_entry: *ERROR* :no_entry: `,
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text,
          },
        },
      ],
    })
  },

  help() {},

  async notifyNewOccurrence({
    component,
    incident,
    description,
  }: {
    component: ComponentBody
    incident: IncidentBody
    description: string
  }) {
    const date = new Date()
    callWebhook({
      text: 'NEW OCCURRENCE :warning:',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: ':warning:  *NEW OCCURRENCE*  :warning:',
          },
        },
        {
          type: 'context',
          elements: [
            {
              text: `*${date.toLocaleString()}* `,
              type: 'mrkdwn',
            },
          ],
        },
        {
          type: 'divider',
        },
        {
          type: 'context',
          elements: [
            {
              text: `*Component*: ${component.name}\n*Incident*: ${incident.name} `,
              type: 'mrkdwn',
            },
          ],
        },
        {
          type: 'divider',
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: ` :computer: *${component.name}* :computer:`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: description,
          },
        },
      ],
    })
  },

  async notifyCloseOccurrence({
    component,
    incident,
  }: {
    component: ComponentBody
    incident: IncidentBody
  }) {
    callWebhook({
      text: 'OCCURRENCE CLOSED :heavy_check_mark:',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: ':heavy_check_mark:  *OCCURRENCE CLOSED*  :heavy_check_mark:',
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

  async notifyUpdateOccurrence({
    component,
    incident,
    step,
  }: {
    component: ComponentBody
    incident: IncidentBody
    step: OccurrenceStepBody
  }) {
    callWebhook({
      text: 'OCCURRENCE UPDATED :construction_worker:',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text:
              ':construction_worker:  *OCCURRENCE UPDATED*  :construction_worker:',
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Component*: ${component.name}\n*Incident*: ${incident.name} \nThis incident had an update!`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*UPDATE*: ${step.description}`,
          },
        },
      ],
    })
  },

  async handleStartAction(action: { value: 'update' | 'incident' | 'help' }) {
    let body = {}
    if (action.value === 'update') {
      body = {
        text: 'Mensagem de teste',
      }
    }

    if (action.value === 'incident') {
      body = {
        text:
          'To create a new occurrence, you should enter `new [component_id] [incident_id] [description]`',
      }
    }

    if (action.value === 'update') {
      body = {
        text:
          'To update an existing occurrence, you should enter `update [occurrence_id] [description]`',
      }
    }

    if (action.value === 'help') {
      body = {
        text:
          'To create a new occurrence, you should enter `new [component_id] [incident_id] [description]`\nTo update an existing occurrence, you should enter `update [occurrence_id] [description]`',
      }
    }

    return body
  },
}
