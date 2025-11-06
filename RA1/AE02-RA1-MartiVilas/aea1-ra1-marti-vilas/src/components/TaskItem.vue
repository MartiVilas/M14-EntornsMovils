<script setup>
const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['toggle', 'remove'])

const onToggle = () => emit('toggle', props.task.id)
const onRemove = () => emit('remove', props.task.id)
</script>

<template>
  <li class="task" :class="{ completed: task.done }">
    <label class="row">
      <input type="checkbox" :checked="task.done" @change="onToggle" />
      <span class="title">{{ task.title }}</span>
    </label>
    <div class="meta">
      s
      <button class="danger" @click="onRemove" aria-label="Eliminar">Eliminar</button>
    </div>
  </li>
</template>

<style scoped>
.task {
  background: var(--surface, #fff);
  border: 1px solid var(--border, #e5e5e5);
  border-radius: 12px;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}
.row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.title {
  font-weight: 500;
}
.completed .title {
  text-decoration: line-through;
  opacity: 0.6;
}
.meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.danger {
  border: none;
  border-radius: 8px;
  padding: 0.4rem 0.6rem;
  cursor: pointer;
}
.date {
  opacity: 0.7;
}
</style>
