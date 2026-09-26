<script setup lang="ts">
const { items, status } = useCheckoutCart()

function lineTotal(line: { quantity: number, summary: { priceInCents: number } }) {
  return (line.quantity * line.summary.priceInCents) / 100
}
</script>

<template>
  <section class="mini-cart">
    <h2>Carrinho</h2>
    <p v-if="status === 'pending'">
      Carregando carrinho…
    </p>
    <p v-else-if="!items.length" class="empty">
      Vazio
    </p>
    <ul v-else>
      <li v-for="line in items" :key="line.productId">
        <span>{{ line.summary.name }}</span>
        <span>× {{ line.quantity }}</span>
        <span>{{ lineTotal(line).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.mini-cart {
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1rem;
  min-width: 16rem;
}
.empty {
  color: #64748b;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
li {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 0.9rem;
}
</style>
