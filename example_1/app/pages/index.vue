<template>
  <main class="home">
    <h1>DDD Layers — example_1</h1>
    <p>Compartilhado na raiz (<code>app/shared</code>). Porta <strong>3000</strong>.</p>
    <ul>
      <li><NuxtLink to="/products/1">Produto 1 (disponível)</NuxtLink></li>
      <li><NuxtLink to="/products/2">Produto 2 (esgotado)</NuxtLink></li>
    </ul>
  </main>
</template>

<style scoped>
.home {
  padding: 2rem;
  font-family: system-ui, sans-serif;
}
</style>
