<script setup>
const props = defineProps({
  task: { type: Object, required: true },
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
      <button class="danger" @click="onRemove" aria-label="Eliminar">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="red"
          class="bi bi-trash2-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M2.037 3.225A.7.7 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.7.7 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z"
          />
        </svg>
      </button>
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
