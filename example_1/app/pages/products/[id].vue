<script setup lang="ts">
const route = useRoute()
const productId = computed(() => String(route.params.id))

const { data: product, status } = await useCatalogProduct(productId)
const cart = useCheckoutCart()

async function onAddToCart(quantity: number) {
  if (product.value) {
    await cart.add({ productId: product.value.id, quantity })
  }
}
</script>

<template>
  <main class="page">
    <header>
      <NuxtLink to="/">
        ← Voltar
      </NuxtLink>
      <p class="tag">
        example_1 · compartilhado em <code>app/shared</code>
      </p>
    </header>
    <div class="layout">
      <CatalogProductDetail
        v-if="product"
        :product="product"
        @add-to-cart="onAddToCart"
      />
      <p v-else-if="status === 'pending'">
        Carregando…
      </p>
      <aside>
        <CheckoutMiniCart />
      </aside>
    </div>
  </main>
</template>

<style scoped>
.page {
  padding: 1.5rem;
  font-family: system-ui, sans-serif;
}
.layout {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 1rem;
}
.tag {
  color: #64748b;
  font-size: 0.875rem;
}
</style>
