<script setup>
import { computed, onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import TaskDialog from 'src/components/TaskDialog.vue'
import { useTaskStore } from 'src/stores/task-store'

const $q = useQuasar()
const tasks = useTaskStore()

const search = ref('')
const dialogOpen = ref(false)
const selectedTask = ref(null)

const filteredTasks = computed(() => {
  const term = search.value.trim().toLowerCase()
  if (!term) return tasks.items

  return tasks.items.filter((task) =>
    [task.title, task.description].some((value) => value?.toLowerCase().includes(term)),
  )
})

onMounted(async () => {
  try {
    await tasks.fetchTasks()
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: error.response?.data?.message || 'Error carregant les tasques.',
    })
  }
})

function openCreate() {
  selectedTask.value = null
  dialogOpen.value = true
}

function openEdit(task) {
  selectedTask.value = { ...task }
  dialogOpen.value = true
}

async function saveTask(task) {
  try {
    if (task?.id) {
      await tasks.updateTask(task.id, task)
      $q.notify({ type: 'positive', message: 'Tasca actualitzada.' })
    } else {
      await tasks.createTask(task)
      $q.notify({ type: 'positive', message: 'Tasca creada.' })
    }
    dialogOpen.value = false
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: error.response?.data?.message || "No s'ha pogut desar la tasca.",
    })
  }
}

function confirmDelete(task) {
  $q.dialog({
    title: 'Confirmació',
    message: `Vols eliminar la tasca "${task.title}"?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    try {
      await tasks.deleteTask(task.id)
      $q.notify({ type: 'positive', message: 'Tasca eliminada.' })
    } catch (error) {
      $q.notify({
        type: 'negative',
        message: error.response?.data?.message || "No s'ha pogut eliminar la tasca.",
      })
    }
  })
}
</script>
<template>
  <q-page class="q-pa-md bg-grey-1">
    <div class="row items-center justify-between q-mb-md">
      <div>
        <div class="text-h5 text-weight-bold">Tasques</div>
        <div class="text-grey-7">CRUD connectat a Nuxt</div>
      </div>
      <q-btn color="primary" icon="add" label="Nova tasca" @click="openCreate" />
    </div>

    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <q-input
          v-model="search"
          outlined
          dense
          debounce="250"
          label="Filtrar per títol o descripció"
          clearable
        >
          <template #prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-card-section>
    </q-card>

    <div v-if="tasks.isLoading" class="flex flex-center q-py-xl">
      <q-spinner color="primary" size="48px" />
    </div>

    <div v-else-if="filteredTasks.length === 0">
      <q-card flat bordered>
        <q-card-section class="text-center text-grey-7"> No hi ha tasques encara. </q-card-section>
      </q-card>
    </div>

    <div v-else class="q-gutter-md">
      <q-card v-for="task in filteredTasks" :key="task.id" flat bordered>
        <q-card-section class="row items-start no-wrap">
          <div class="col">
            <div class="row items-center q-gutter-sm">
              <div class="text-subtitle1 text-weight-medium">{{ task.title }}</div>
              <q-badge :color="task.completed ? 'positive' : 'orange'">
                {{ task.completed ? 'Feta' : 'Pendent' }}
              </q-badge>
            </div>
            <div class="text-grey-7 q-mt-sm">{{ task.description || 'Sense descripció' }}</div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat color="primary" icon="edit" label="Editar" @click="openEdit(task)" />
          <q-btn
            flat
            color="negative"
            icon="delete"
            label="Eliminar"
            @click="confirmDelete(task)"
          />
        </q-card-actions>
      </q-card>
    </div>

    <TaskDialog v-model="dialogOpen" :task="selectedTask" @save="saveTask" />
  </q-page>
</template>
