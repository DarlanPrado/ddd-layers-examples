<script setup lang="ts">
defineProps<{
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}>()
</script>

<template>
  <button
    class="ui-button"
    :type="type ?? 'button'"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style scoped>
.ui-button {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: 1px solid #1e293b;
  background: #0f172a;
  color: #f8fafc;
  font-weight: 600;
  cursor: pointer;
}
.ui-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
