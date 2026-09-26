import type { components } from '~/shared/api/schema'
import type { CatalogProductSummary } from '../public'

export function toProductSummary(dto: components['schemas']['Product']): CatalogProductSummary {
  return {
    id: dto.id,
    name: dto.name,
    priceInCents: dto.price_in_cents,
    available: dto.stock > 0,
  }
}
