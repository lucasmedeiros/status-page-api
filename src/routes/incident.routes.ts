import Router from 'koa-router'
import IncidentController from '@controllers/incident'
import Handler from '@utils/handler'

const handler = new Handler(new IncidentController())

const routes = new Router()
routes.get('Get all incidents', '/', handler.get)
routes.get('Get incident', '/:id', handler.getOne)
routes.post('Create incident', '/', handler.create)
routes.put('Update incident', '/:id', handler.update)
routes.del('Delete incident', '/:id', handler.del)
export default routes
