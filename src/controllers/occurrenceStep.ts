import {
  NOT_FOUND,
  OK,
  BAD_REQUEST,
  CREATED,
  INTERNAL_SERVER_ERROR,
} from 'http-status-codes'
import { Context } from 'koa'
import OccurrenceStep from '@models/occurrenceStep'
import { dbErr, dbOk } from '@utils/handler'
import Occurrence from '@models/occurrence'
import slackService from '@services/slack.service'

import OccurenceController from './occurrence'

const occurrenceController = new OccurenceController()

class OccurrenceStepController
  implements Controller<OccurrenceStep, OccurrenceStepBody, Error> {
  public get = async (ctx: Context): Promise<OccurrenceStep[]> => {
    const { id } = ctx.params
    const occurrenceSteps = await OccurrenceStep.findAll({
      where: { occurrenceId: id },
    })
    return occurrenceSteps
  }

  public getOne = async (
    id: number
  ): Promise<DatabaseResult<OccurrenceStep, Error>> => {
    const occurrenceStep = await OccurrenceStep.findByPk(id, {
      include: [
        {
          model: Occurrence,
        },
      ],
    })

    if (!occurrenceStep)
      return dbErr(new Error('Occurrence step not found'), NOT_FOUND)

    return dbOk(occurrenceStep, OK)
  }

  public create = async (
    body: OccurrenceStepBody
  ): Promise<DatabaseResult<OccurrenceStep, Error>> => {
    if (!body.description)
      return dbErr(
        new Error(`'description' field must not be null or empty`),
        BAD_REQUEST
      )

    if (!body.occurrenceId)
      return dbErr(
        new Error(`'occurrenceId' field must not be null`),
        BAD_REQUEST
      )

    const occurrence = await occurrenceController.getOne(body.occurrenceId)
    if (occurrence.isError) return dbErr(occurrence.error, occurrence.status)

    try {
      const occurrenceStep = await OccurrenceStep.create({
        description: body.description,
        occurrenceId: body.occurrenceId,
      })

      if (occurrence.value.active) {
        slackService.notifyUpdateOccurrence({
          component: {
            name: occurrence.value.Component.name,
          },
          incident: {
            name: occurrence.value.Incident.name,
          },
          step: body,
        })
      }

      return dbOk(occurrenceStep, CREATED)
    } catch (error) {
      return dbErr(error, INTERNAL_SERVER_ERROR)
    }
  }

  public update = async (
    id: number,
    body: OccurrenceStepBody
  ): Promise<DatabaseResult<OccurrenceStep, Error>> => {
    const occurrenceStep = await OccurrenceStep.findByPk(id)

    if (!occurrenceStep)
      return dbErr(new Error('Occurrence step not found'), NOT_FOUND)

    if (body.description === null || body.description === undefined)
      body.description = occurrenceStep.description

    await occurrenceStep.update({
      description: body.description,
    })

    return dbOk(occurrenceStep, OK)
  }

  public del = async (
    id: number
  ): Promise<DatabaseResult<OccurrenceStep, Error>> => {
    const occurrenceStep = await OccurrenceStep.findByPk(id)
    if (!occurrenceStep)
      return dbErr(new Error('Occurrence step not found'), NOT_FOUND)

    await occurrenceStep.destroy()
    return dbOk(occurrenceStep, OK)
  }
}

export default OccurrenceStepController
