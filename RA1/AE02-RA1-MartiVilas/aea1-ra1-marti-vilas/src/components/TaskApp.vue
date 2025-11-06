<script setup>
import { ref, computed } from 'vue'

// Dades reactives
const newTitle = ref('')
const showOnlyPending = ref(false)
const tasks = ref([
  { id: 1, title: 'Investigar sobre VUE', done: false, createdAt: new Date() },
  { id: 2, title: "Fer l'activitat de M14", done: false, createdAt: new Date() },
  { id: 3, title: 'Descansar 2 dies', done: true, createdAt: new Date() },
])
const visibleTasks = computed(() => {
  return showOnlyPending.value ? tasks.value.filter((t) => !t.done) : tasks.value
})

const totalCount = computed(() => tasks.value.length)
const pendingCount = computed(() => tasks.value.filter((t) => !t.done).length)

function addTask() {
  const title = newTitle.value.trim()
  if (!title) return
  const nextId = tasks.value.length ? Math.max(...tasks.value.map((t) => t.id)) + 1 : 1
  tasks.value.push({
    id: nextId,
    title,
    done: false,
    createdAt: new Date(),
  })
  newTitle.value = ''
}

function toggleDone(task) {
  task.done = !task.done
}

function removeTask(id) {
  tasks.value = tasks.value.filter((t) => t.id !== id)
}

function formatDate(d) {
  if (!d) return ''
  const date = d instanceof Date ? d : new Date(d)
  return date.toLocaleString()
}
</script>

<template>
  <main class="page-center">
    <section class="task-app">
      <h1>Gestor de Tasques</h1>

      <div class="add-row">
        <input
          v-model="newTitle"
          type="text"
          placeholder="Títol de la tasca"
          @keyup.enter="addTask"
          aria-label="Nou títol"
        />
        <button class="primary" @click="addTask">Afegir</button>
      </div>

      <div class="controls">
        <label class="toggle">
          <input type="checkbox" v-model="showOnlyPending" />
          <span>Mostrar només pendents</span>
        </label>

        <div class="summary">
          <strong>Total:</strong> {{ totalCount }} · <strong>Pendents:</strong> {{ pendingCount }}
        </div>
      </div>

      <div v-if="visibleTasks.length" class="list">
        <div v-for="task in visibleTasks" :key="task.id" class="item" :class="{ done: task.done }">
          <label class="left">
            <input type="checkbox" :checked="task.done" @change="toggleDone(task)" />
            <span class="title">{{ task.title }}</span>
          </label>

          <div class="right">
            <time class="date" :title="formatDate(task.createdAt)">
              {{ formatDate(task.createdAt) }}
            </time>
            <button class="danger" @click="removeTask(task.id)" aria-label="Eliminar">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash2-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M2.037 3.225A.7.7 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.7.7 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <p v-else class="empty">No hi ha tasques a mostrar.</p>
    </section>
  </main>
</template>

<style scoped>
.task-app {
  max-width: 700px;
  margin: 2rem auto;
  padding: 1.5rem;
  border-radius: 12px;
}

h1 {
  margin: 0 0 1rem 0;
  font-size: 1.6rem;
}

.add-row {
  display: flex;
  gap: 0.5rem;
}

.add-row input {
  flex: 1;
  padding: 0.6rem 0.8rem;
  border-radius: 8px;
}

button {
  border: none;
  padding: 0.55rem 0.9rem;
  border-radius: 8px;
  cursor: pointer;
}

button.primary {
  background: #2563eb;
  color: white;
}

button.danger {
  background: #ef4444;
  color: white;
}

.controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
}

.toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.summary {
  opacity: 0.9;
}

.list {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 0.8rem;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
}

.item.done .title {
  text-decoration: line-through;
  opacity: 0.6;
}

.item .left {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.item .right {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.empty {
  margin-top: 1rem;
  opacity: 0.8;
}
</style>
