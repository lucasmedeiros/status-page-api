import Router from 'koa-router'

import component from './component.routes'

const routes = new Router()

routes.use('/component', component.routes(), component.allowedMethods())

export default routes
