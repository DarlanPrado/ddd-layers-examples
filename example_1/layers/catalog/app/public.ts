import type { components } from '~/shared/api/schema'

type ProductDTO = components['schemas']['Product']

export interface CatalogProductSummary {
  id: ProductDTO['id']
  name: string
  priceInCents: number
  available: boolean
}
