import Router from 'koa-router'

import component from './component.routes'
import incident from './incident.routes'

const routes = new Router()

routes.use('/component', component.routes(), component.allowedMethods())
routes.use('/incident', incident.routes(), incident.allowedMethods())

export default routes
