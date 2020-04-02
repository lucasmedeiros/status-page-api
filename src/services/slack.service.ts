import { WebClient, WebAPICallResult } from '@slack/web-api'
import winston from 'winston'

import config from '../config'

const web = new WebClient(config.slack.botUserToken)

interface ChatPostMessageResult extends WebAPICallResult {
  channel: string
  ts: string
  message: {
    text: string
  }
}

export default {
  sendMessage: async (text: string, channel: string) => {
    const res = (await web.chat.postMessage({
      text,
      channel,
    })) as ChatPostMessageResult

    winston.log(
      'info',
      `A message was post to conversation ${res.channel} with id ${res.ts} wich contains the message ${res.message}`
    )
  },
}
