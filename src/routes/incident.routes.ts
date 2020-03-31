import Router from 'koa-router'
import controller from '@controllers/incident'

const routes = new Router()
routes.get('Get all incidents', '/', controller.get)
routes.get('Get incident', '/:id', controller.getOne)
routes.post('Create incident', '/', controller.create)
routes.put('Update incident', '/:id', controller.update)
routes.del('Delete incident', '/:id', controller.del)
export default routes
