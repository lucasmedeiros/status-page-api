import Component from '@models/component'

export default {
  get: async (): Promise<Component[]> => {
    const components = await Component.findAll()
    return components
  },
}
