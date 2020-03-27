import Koa from 'koa'
import json from 'koa-json'
import bodyParser from 'koa-bodyparser'
import helmet from 'koa-helmet'
import cors from '@koa/cors'
import winston from 'winston'

import config from './config'
import { logger } from './logging'

const app = new Koa()
// Provides important security headers to make your app more secure
app.use(helmet())

// Enable cors with default options
app.use(cors())

// Logger middleware -> use winston as logger (logging.ts with config)
app.use(logger(winston))

// Enable bodyParser with default options
app.use(bodyParser())

app.use(json())

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${config.port}`)
})
