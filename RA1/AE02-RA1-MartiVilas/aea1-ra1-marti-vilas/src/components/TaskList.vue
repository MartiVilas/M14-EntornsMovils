<script setup>
import TaskItem from './TaskItem.vue'

const props = defineProps({
  tasks: { type: Array, required: true, default: () => [] },
})

const emit = defineEmits(['toggle', 'remove'])
const onToggle = (id) => emit('toggle', id)
const onRemove = (id) => emit('remove', id)
</script>

<template>
  <ul class="task-list" v-if="tasks.length">
    <TaskItem v-for="t in tasks" :key="t.id" :task="t" @toggle="onToggle" @remove="onRemove" />
  </ul>
  <p v-else class="empty">No hi ha tasques per mostrar.</p>
</template>

<style scoped>
.task-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.empty {
  text-align: center;
  opacity: 0.7;
  margin-top: 0.5rem;
}
</style>
