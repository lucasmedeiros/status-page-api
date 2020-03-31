// import 'module-alias/register'

import Koa from 'koa'
import json from 'koa-json'
import bodyParser from 'koa-bodyparser'
import helmet from 'koa-helmet'
import winston from 'winston'
import cors from '@koa/cors'
import routes from '@routes/index'

import config from './config'
import { logger } from './logging'

const app = new Koa()
app.use(helmet())
app.use(cors())
app.use(logger(winston))
app.use(bodyParser())
app.use(json())
app.use(routes.routes()).use(routes.allowedMethods())

app.listen(config.port, () => {
  winston.log('info', `Server running on port ${config.port}`)
  winston.log('info', `To stop, press CTRL + C`)
})
