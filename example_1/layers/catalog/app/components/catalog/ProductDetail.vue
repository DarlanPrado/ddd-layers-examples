<script setup lang="ts">
import type { CatalogProductSummary } from '../../public'

defineProps<{ product: CatalogProductSummary }>()
const emit = defineEmits<{ 'add-to-cart': [quantity: number] }>()
const quantity = ref(1)
</script>

<template>
  <article class="product">
    <h1>{{ product.name }}</h1>
    <p class="price">
      {{ (product.priceInCents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
    </p>
    <p v-if="!product.available" class="unavailable">
      Indisponível
    </p>
    <label>
      Quantidade
      <input v-model.number="quantity" type="number" min="1">
    </label>
    <UiButton :disabled="!product.available" @click="emit('add-to-cart', quantity)">
      Adicionar ao carrinho
    </UiButton>
  </article>
</template>

<style scoped>
.product {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 28rem;
}
.price {
  font-size: 1.25rem;
  font-weight: 600;
}
.unavailable {
  color: #b91c1c;
}
</style>
