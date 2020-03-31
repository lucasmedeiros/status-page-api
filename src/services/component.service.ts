import Component from '@models/component'
import { dbErr, dbOk } from '@utils/dbResult'
import { NOT_FOUND, OK } from 'http-status-codes'

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
}
