import Router from 'koa-router'
import controller from '@controllers/slack'

const routes = new Router()

routes.post('Subscribe to event', '/', controller.botEvent)

export default routes
