import Router from 'koa-router'
import controller from '@controllers/component'

const routes = new Router()
routes.get('Get all components', '/', controller.get)
routes.get('Get component', '/:id', controller.getOne)
routes.post('Create component', '/', controller.create)
routes.put('Update component', '/:id', controller.update)
export default routes
