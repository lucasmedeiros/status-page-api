import Router from 'koa-router'
import controller from '@controllers/slack'

const routes = new Router()

routes.post('Subscribe to event', '/', controller.botEvent)
routes.post('Receive actions', '/actions', controller.actions)

export default routes
