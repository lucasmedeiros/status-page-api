import Router from 'koa-router'

import component from './component.routes'
import incident from './incident.routes'
import occurrence from './occurrence.routes'
import slack from './slack.routes'

const routes = new Router()

routes.use('/component', component.routes(), component.allowedMethods())
routes.use('/incident', incident.routes(), incident.allowedMethods())
routes.use('/occurrence', occurrence.routes(), occurrence.allowedMethods())
routes.use('/slack', slack.routes(), slack.allowedMethods())

export default routes
