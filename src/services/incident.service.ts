import Incident from '@models/incident'
import { dbErr, dbOk } from '@utils/dbResult'
import { NOT_FOUND, OK, BAD_REQUEST, CREATED } from 'http-status-codes'

export default {
  get: async (): Promise<Incident[]> => {
    const incidents = await Incident.findAll()
    return incidents
  },

  getOne: async (id: number): Promise<DatabaseResult<Incident, Error>> => {
    const incident = await Incident.findByPk(id)

    if (!incident) return dbErr(new Error('Incident not found'), NOT_FOUND)

    return dbOk(incident, OK)
  },

  create: async (
    body: IncidentBody
  ): Promise<DatabaseResult<Incident, Error>> => {
    if (!body.name)
      return dbErr(new Error(`'Name' field must not be null`), BAD_REQUEST)

    const incident = await Incident.create(body)

    return dbOk(incident, CREATED)
  },

  update: async (
    id: number,
    body: IncidentBody
  ): Promise<DatabaseResult<Incident, Error>> => {
    const incident = await Incident.findByPk(id)

    if (!incident) return dbErr(new Error('Incident not found'), NOT_FOUND)

    if (!body.name)
      return dbErr(new Error(`'Name' field must not be null`), BAD_REQUEST)

    incident.update(body)

    return dbOk(incident, OK)
  },

  del: async (id: number): Promise<DatabaseResult<Incident, Error>> => {
    const incident = await Incident.findByPk(id)
    if (!incident) return dbErr(new Error('Incident not found'), NOT_FOUND)

    await incident.destroy()
    return dbOk(incident, OK)
  },
}
