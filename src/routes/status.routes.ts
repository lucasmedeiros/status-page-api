import Router from 'koa-router'
import status from '@controllers/status'

const routes = new Router()

routes.get('Get health status from application', '/', status.get)

export default routes
