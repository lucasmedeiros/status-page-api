import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR } from 'http-status-codes'
import Occurrence from '@models/occurrence'
import { dbErr, dbOk } from '@utils/dbResult'
import componentService from '@services/component.service'
import incidentService from '@services/incident.service'

export default {
  create: async (
    body: OccurrenceBody
  ): Promise<DatabaseResult<Occurrence, Error>> => {
    if (body.active === null || body.active === undefined)
      return dbErr(new Error(`'active' value must not be null`), BAD_REQUEST)

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

    const component = await componentService.getOne(body.componentId)
    if (component.isError) return dbErr(component.error, component.status)

    const incident = await incidentService.getOne(body.incidentId)
    if (incident.isError) return dbErr(incident.error, incident.status)

    try {
      const occurrence = await Occurrence.create(body)
      return dbOk(occurrence, CREATED)
    } catch (error) {
      return dbErr(new Error(error.message), INTERNAL_SERVER_ERROR)
    }
  },
}
