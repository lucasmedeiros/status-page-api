import Component from '@models/component'
import { dbErr, dbOk } from '@utils/dbResult'
import { NOT_FOUND, OK, BAD_REQUEST, CREATED } from 'http-status-codes'

export default {
  get: async (): Promise<Component[]> => {
    const components = await Component.findAll()
    return components
  },

  getOne: async (id: number): Promise<DatabaseResult<Component, Error>> => {
    const component = await Component.findByPk(id)

    if (!component) return dbErr(new Error('Component not found'), NOT_FOUND)

    return dbOk(component, OK)
  },

  create: async (
    body: ComponentBody
  ): Promise<DatabaseResult<Component, Error>> => {
    if (!body.name)
      return dbErr(new Error(`'Name' field must not be null`), BAD_REQUEST)

    const component = await Component.create(body)

    return dbOk(component, CREATED)
  },

  update: async (
    id: number,
    body: ComponentBody
  ): Promise<DatabaseResult<Component, Error>> => {
    const component = await Component.findByPk(id)

    if (!component) return dbErr(new Error('Component not found'), NOT_FOUND)

    if (!body.name)
      return dbErr(new Error(`'Name' field must not be null`), BAD_REQUEST)

    component.update(body)

    return dbOk(component, OK)
  },
}
