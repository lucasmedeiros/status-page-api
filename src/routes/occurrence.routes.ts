import Router from 'koa-router'
import OccurrenceController from '@controllers/occurrence'
import OccurrenceStepController from '@controllers/occurrenceStep'
import Handler from '@utils/handler'

const occurrenceHandler = new Handler<OccurrenceBody>(
  new OccurrenceController()
)

const stepHandler = new Handler<OccurrenceStepBody>(
  new OccurrenceStepController()
)

const routes = new Router()

routes.get('Get all occurrences', '/', occurrenceHandler.get)
routes.get('Get one occurrence', '/:id', occurrenceHandler.getOne)
routes.post('Create occurrence', '/', occurrenceHandler.create)
routes.put('Update occurrence', '/:id', occurrenceHandler.update)
routes.del('Delete occurrence', '/:id', occurrenceHandler.del)

// Occurrences Steps
routes.get('Get all steps for one occurrence', '/:id/steps', stepHandler.get)
routes.get('Get one occurrence step', '/step/:id', stepHandler.getOne)
routes.post('Create occurrence step', '/step', stepHandler.create)
routes.put('Update occurrence step', '/step/:id', stepHandler.update)
routes.del('Delete occurrence step', '/step/:id', stepHandler.del)

export default routes
