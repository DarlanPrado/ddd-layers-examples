import { toCheckoutCart } from '../internal/mappers'

export function useCheckoutCart() {
  const api = useApi()
  const nuxtApp = useNuxtApp()

  const { data, refresh, status } = useAsyncData('checkout:cart', async () => {
    const { data: cartData, error } = await api.GET('/cart')
    if (error || !cartData) {
      throw createError({ statusCode: 502, statusMessage: 'Não foi possível carregar o carrinho' })
    }
    return toCheckoutCart(cartData)
  })

  async function add(payload: { productId: string, quantity: number }) {
    const { error } = await api.POST('/cart/items', { body: payload })
    if (error) {
      throw createError({ statusCode: 502, statusMessage: 'Não foi possível adicionar ao carrinho' })
    }
    await refresh()
    await nuxtApp.callHook('checkout:item-added', payload)
  }

  const items = computed(() => data.value?.items ?? [])

  return { items, add, refresh, status }
}
