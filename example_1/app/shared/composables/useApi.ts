import type { paths } from '~/shared/api/schema'
import type { Client } from 'openapi-fetch'

export function useApi(): Client<paths> {
  return useNuxtApp().$api
}
