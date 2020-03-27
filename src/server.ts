import Koa from 'koa'
import json from 'koa-json'
import bodyParser from 'koa-bodyparser'
import helmet from 'koa-helmet'
import cors from '@koa/cors'
import winston from 'winston'

import config from './config'
import { logger } from './logging'

const app = new Koa()
app.use(helmet())
app.use(cors())
app.use(logger(winston))
app.use(bodyParser())

app.use(json())

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${config.port}`)
})
