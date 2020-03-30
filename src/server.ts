// import 'module-alias/register'

import Koa from 'koa'
import json from 'koa-json'
import bodyParser from 'koa-bodyparser'
import helmet from 'koa-helmet'
import winston from 'winston'
import cors from '@koa/cors'
import component from '@models/component'

import config from './config'
import { logger } from './logging'

// eslint-disable-next-line no-console
console.log(component)

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
