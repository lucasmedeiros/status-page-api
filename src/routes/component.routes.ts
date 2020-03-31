import Router from 'koa-router'
import controller from '@controllers/component'

const routes = new Router()
routes.get('Get all components', '/', controller.get)
routes.get('Get one component', '/:id', controller.getOne)
export default routes
