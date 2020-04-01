import Component from '@models/component'
import { dbErr, dbOk } from '@utils/handler'
import { NOT_FOUND, OK, BAD_REQUEST, CREATED } from 'http-status-codes'

class ComponentController
  implements Controller<Component, ComponentBody, Error> {
  public get = async (): Promise<Component[]> => {
    const components = await Component.findAll()
    return components
  }

  public getOne = async (
    id: number
  ): Promise<DatabaseResult<Component, Error>> => {
    const component = await Component.findByPk(id)

    if (!component) return dbErr(new Error('Component not found'), NOT_FOUND)

    return dbOk(component, OK)
  }

  public create = async (
    body: ComponentBody
  ): Promise<DatabaseResult<Component, Error>> => {
    if (!body.name)
      return dbErr(new Error(`'Name' field must not be null`), BAD_REQUEST)

    const component = await Component.create(body)

    return dbOk(component, CREATED)
  }

  public update = async (
    id: number,
    body: ComponentBody
  ): Promise<DatabaseResult<Component, Error>> => {
    const component = await Component.findByPk(id)

    if (!component) return dbErr(new Error('Component not found'), NOT_FOUND)

    if (body.name === null)
      return dbErr(new Error(`'Name' field must not be null`), BAD_REQUEST)

    await component.update(body)

    return dbOk(component, OK)
  }

  public del = async (
    id: number
  ): Promise<DatabaseResult<Component, Error>> => {
    const component = await Component.findByPk(id)
    if (!component) return dbErr(new Error('Component not found'), NOT_FOUND)

    await component.destroy()
    return dbOk(component, OK)
  }
}

export default ComponentController
