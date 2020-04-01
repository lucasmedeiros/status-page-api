import {
  BAD_REQUEST,
  CREATED,
  INTERNAL_SERVER_ERROR,
  OK,
  NOT_FOUND,
} from 'http-status-codes'
import Occurrence from '@models/occurrence'
import { dbErr, dbOk } from '@utils/handler'
import Component from '@models/component'
import Incident from '@models/incident'

import ComponentController from './component'
import IncidentController from './incident'

const componentController = new ComponentController()
const incidentController = new IncidentController()

class OccurenceController
  implements Controller<Occurrence, OccurrenceBody, Error> {
  public get = async (): Promise<Occurrence[]> => {
    const occurences = await Occurrence.findAll()
    return occurences
  }

  public getOne = async (
    id: number
  ): Promise<DatabaseResult<Occurrence, Error>> => {
    const occurrence = await Occurrence.findByPk(id, {
      include: [{ model: Component }, { model: Incident }],
    })

    if (!occurrence) return dbErr(new Error('Occurrence not found'), NOT_FOUND)

    return dbOk(occurrence, OK)
  }

  public create = async (
    body: OccurrenceBody
  ): Promise<DatabaseResult<Occurrence, Error>> => {
    if (body.active === null || body.active === undefined) body.active = true

    if (!body.incidentId)
      return dbErr(
        new Error(`'incidentId' value must not be null`),
        BAD_REQUEST
      )

    if (!body.componentId)
      return dbErr(
        new Error(`'componentId' value must not be null`),
        BAD_REQUEST
      )

    if (!body.description)
      return dbErr(
        new Error(`'description' value must not be null`),
        BAD_REQUEST
      )

    const component = await componentController.getOne(body.componentId)
    if (component.isError) return dbErr(component.error, component.status)

    const incident = await incidentController.getOne(body.incidentId)
    if (incident.isError) return dbErr(incident.error, incident.status)

    try {
      const occurrence = await Occurrence.create(body)
      return dbOk(occurrence, CREATED)
    } catch (error) {
      return dbErr(error, INTERNAL_SERVER_ERROR)
    }
  }

  public update = async (
    id: number,
    body: OccurrenceBody
  ): Promise<DatabaseResult<Occurrence, Error>> => {
    const occurence = await Occurrence.findByPk(id)

    if (!occurence) return dbErr(new Error('Occurrence not found'), NOT_FOUND)

    if (body.active === null || body.active === undefined)
      body.active = occurence.active

    try {
      await occurence.update(body)
      return dbOk(occurence, OK)
    } catch (error) {
      return dbErr(error, INTERNAL_SERVER_ERROR)
    }
  }

  public del = async (
    id: number
  ): Promise<DatabaseResult<Occurrence, Error>> => {
    const occurence = await Occurrence.findByPk(id)
    if (!occurence) return dbErr(new Error('Occurrence not found'), NOT_FOUND)

    await occurence.destroy()
    return dbOk(occurence, OK)
  }
}

export default OccurenceController
