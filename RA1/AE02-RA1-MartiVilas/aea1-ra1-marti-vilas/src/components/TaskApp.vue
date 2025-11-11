<script setup>
import { ref, computed } from 'vue'
import TaskForm from './TaskForm.vue'
import TaskList from './TaskList.vue'

const tasks = ref([
  { id: 1, title: 'Investigar sobre VUE', done: false },
  { id: 2, title: "Fer l'activitat de M14", done: false },
  { id: 3, title: 'Descansar 2 dies', done: true },
])

const showOnlyPending = ref(false)

const visibleTasks = computed(() =>
  showOnlyPending.value ? tasks.value.filter((t) => !t.done) : tasks.value,
)
const totalCount = computed(() => tasks.value.length)
const pendingCount = computed(() => tasks.value.filter((t) => !t.done).length)

function addTask(title) {
  if (!title?.trim()) return
  tasks.value.push({
    id: crypto.randomUUID(),
    title: title.trim(),
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
    <h1>Gestor de Tasques</h1>

    <TaskForm @add-task="addTask" />

    <div class="controls">
      <label class="toggle">
        <input type="checkbox" v-model="showOnlyPending" />
        Mostrar només pendents
      </label>
      <div class="summary">
        <strong>Total:</strong> {{ totalCount }} · <strong>Pendents:</strong> {{ pendingCount }}
      </div>
    </div>

    <TaskList :tasks="visibleTasks" @toggle="toggleTask" @remove="removeTask" />
  </main>
</template>

<style scoped>
.app {
  max-width: 720px;
  margin: 40px auto;
  padding: 20px;
}
.controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 1rem 0;
}
.summary {
  margin-left: auto;
  opacity: 0.85;
}
</style>
