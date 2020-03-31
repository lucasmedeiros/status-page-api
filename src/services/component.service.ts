import Component from '@models/component'
import { dbErr, dbOk } from '@utils/dbResult'
import { NOT_FOUND, OK, BAD_REQUEST } from 'http-status-codes'

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
