import { queryCollection } from '@nuxt/content/server'

export default eventHandler(async (event) => {
  return queryCollection(event, 'content').where('navigation', '<>', false).all()
})
