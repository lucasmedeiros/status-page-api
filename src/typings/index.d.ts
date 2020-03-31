type Status = 'noissues' | 'maintenance' | 'notice' | 'incident' | 'outage'

interface ComponentAttrs {
  id: number
  name: string
  readonly createdAt: Date
  readonly updatedAt: Date
}

interface IncidentAttrs {
  id: number
  name: string
  readonly createdAt: Date
  readonly updatedAt: Date
}

interface OccurrenceAttrs {
  id: number
  active: boolean
  description: string
  componentId: number
  incidentId: number
  readonly createdAt: Date
  readonly updatedAt: Date
}

interface ComponentBody {
  name?: string
}

interface IncidentBody {
  name?: string
}

interface OccurrenceBody {
  active?: boolean
  description?: string
  componentId?: number
  incidentId?: number
}

interface ErrorResponse {
  message: string
}

type DatabaseResult<R, E> =
  | {
      isError: true
      status: number
      error: E
    }
  | {
      isError: false
      status: number
      value: R
    }
