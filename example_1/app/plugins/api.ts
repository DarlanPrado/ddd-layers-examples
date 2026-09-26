import createClient from 'openapi-fetch'
import type { paths } from '~/shared/api/schema'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const baseUrl = import.meta.server ? config.apiBaseServer + config.public.apiBase : config.public.apiBase
  const api = createClient<paths>({ baseUrl })

  if (import.meta.server) {
    const { cookie } = useRequestHeaders(['cookie'])
    api.use({
      onRequest({ request }) {
        if (cookie) {
          request.headers.set('cookie', cookie)
        }
        return request
      },
    })
  }

  return {
    provide: { api },
  }
})
