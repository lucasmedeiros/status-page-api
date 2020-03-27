type Status = 'noissues' | 'maintenance' | 'notice' | 'incident' | 'outage'

interface ComponentAttrs {
  id: number
  name: string
  readonly createdAt?: Date
  readonly updatedAt?: Date
}
