<script setup>
import { ref } from 'vue'
const emit = defineEmits(['add-task'])
const title = ref('')

const submit = () => {
  const trimmed = title.value.trim()
  if (!trimmed) return
  emit('add-task', trimmed)
  title.value = ''
}
</script>

<template>
  <form class="task-form" @submit.prevent="submit">
    <input v-model="title" type="text" placeholder="Nova tasca..." aria-label="Títol de la tasca" />
    <button type="submit" class="primary">Afegir</button>
  </form>
</template>

<style scoped>
.task-form {
  display: flex;
  gap: 0.5rem;
}
.task-form input {
  flex: 1;
  padding: 0.6rem 0.75rem;
  border-radius: 8px;
  border: 1px solid var(--border, #ddd);
  background: var(--surface, #fff);
  color: inherit;
}
.task-form .primary {
  padding: 0.6rem 0.9rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}
</style>
