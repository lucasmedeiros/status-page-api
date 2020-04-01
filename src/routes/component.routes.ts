import Router from 'koa-router'
import ComponentController from '@controllers/component'
import Handler from '@utils/handler'

const handler = new Handler(new ComponentController())

const routes = new Router()
routes.get('Get all components', '/', handler.get)
routes.get('Get component', '/:id', handler.getOne)
routes.post('Create component', '/', handler.create)
routes.put('Update component', '/:id', handler.update)
routes.del('Delete component', '/:id', handler.del)
export default routes
