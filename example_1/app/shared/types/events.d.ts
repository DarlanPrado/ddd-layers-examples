import type { HookResult } from '@nuxt/schema'

declare module '#app' {
  interface RuntimeNuxtHooks {
    'checkout:item-added': (payload: { productId: string; quantity: number }) => HookResult
  }
}

export {}
