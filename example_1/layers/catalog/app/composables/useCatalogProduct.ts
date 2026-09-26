import type { MaybeRefOrGetter } from 'vue'
import { toProductSummary } from '../internal/mappers'

export function useCatalogProduct(productId: MaybeRefOrGetter<string>) {
  const api = useApi()

  return useAsyncData(
    () => `catalog:product:${toValue(productId)}`,
    async () => {
      const { data, error, response } = await api.GET('/products/{productId}', {
        params: { path: { productId: toValue(productId) } },
      })

      if (error || !data) {
        const notFound = response.status === 404
        throw createError({
          statusCode: notFound ? 404 : 502,
          statusMessage: notFound ? 'Produto não encontrado' : 'Não foi possível carregar o produto',
        })
      }

      return toProductSummary(data)
    },
  )
}
