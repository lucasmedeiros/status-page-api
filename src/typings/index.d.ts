type Status = 'noissues' | 'maintenance' | 'notice' | 'incident' | 'outage'

interface ComponentAttrs {
  id: number
  name: string
  readonly createdAt: Date
  readonly updatedAt: Date
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
