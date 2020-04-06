import Router from 'koa-router'

import component from './component.routes'
import incident from './incident.routes'
import occurrence from './occurrence.routes'
import slack from './slack.routes'
import status from './status.routes'

const routes = new Router()

routes.use('/component', component.routes(), component.allowedMethods())
routes.use('/incident', incident.routes(), incident.allowedMethods())
routes.use('/occurrence', occurrence.routes(), occurrence.allowedMethods())
routes.use('/slack', slack.routes(), slack.allowedMethods())
routes.use('/status', status.routes(), status.allowedMethods())

export default routes
