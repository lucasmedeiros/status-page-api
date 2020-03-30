import Router from 'koa-router'
import controller from '@controllers/component'

const routes = new Router()
routes.get('Get all components', '/', controller.get)
export default routes
