<script setup>
import { ref, computed } from 'vue'
import TaskForm from './TaskForm.vue'
import TaskList from './TaskList.vue'

let nextId = 4

const tasks = ref([
  { id: 1, title: 'Investigar sobre VUE', done: false },
  { id: 2, title: "Fer l'activitat de M14", done: false },
  { id: 3, title: 'Descansar 2 dies', done: true },
])

const showOnlyPending = ref(false)

const visibleTasks = computed(() =>
  showOnlyPending.value ? tasks.value.filter((t) => !t.done) : tasks.value,
)

const pendingCount = computed(() => tasks.value.filter((t) => !t.done).length)
const totalCount = computed(() => tasks.value.length)

function addTask(title) {
  tasks.value.unshift({
    id: nextId++,
    title,
    done: false,
  })
}

function toggleTask(id) {
  const t = tasks.value.find((t) => t.id === id)
  if (t) t.done = !t.done
}

function removeTask(id) {
  tasks.value = tasks.value.filter((t) => t.id !== id)
}
</script>

<template>
  <main class="app">
    <h1 class="title">Gestor de Tasques</h1>

    <TaskForm @add-task="addTask" />

    <div class="controls">
      <label class="toggle">
        <input type="checkbox" v-model="showOnlyPending" />
        <span>Mostrar només pendents</span>
      </label>

      <div class="summary">
        <strong>Total:</strong> {{ totalCount }} · <strong>Pendents:</strong> {{ pendingCount }}
      </div>
    </div>

    <Task List :tasks="visibleTasks" @toggle="toggleTask" @remove="removeTask" />
  </main>
</template>

<style scoped>
.app {
  max-width: 720px;
  margin: 40px auto;
  background: var(--background, #fafafa);
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.08);
}
.title {
  text-align: center;
  margin-bottom: 1rem;
}
.controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.75rem 0 1rem;
  gap: 1rem;
  flex-wrap: wrap;
}
.toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.summary {
  opacity: 0.85;
}
.primary {
  background: #3b82f6;
  color: #fff;
}
.danger {
  background: #ef4444;
  color: #fff;
}
</style>
