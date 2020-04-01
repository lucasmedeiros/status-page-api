import Router from 'koa-router'
import OccurrenceController from '@controllers/occurrence'
import Handler from '@utils/handler'

const handler = new Handler(new OccurrenceController())

const routes = new Router()
routes.get('Get all occurrences', '/', handler.get)
routes.get('Get one occurrence', '/:id', handler.getOne)
routes.post('Create occurrence', '/', handler.create)
routes.put('Create occurrence', '/:id', handler.update)
routes.del('Delete occurrence', '/:id', handler.del)
export default routes
