<template>
  <q-dialog v-model="isOpen" persistent>
    <q-card style="min-width: 320px; width: 100%; max-width: 520px">
      <q-card-section>
        <div class="text-h6">{{ isEdit ? 'Editar tasca' : 'Nova tasca' }}</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="submitForm" class="q-gutter-md">
          <q-input
            v-model="form.title"
            label="Títol"
            outlined
            lazy-rules
            :rules="[(v) => !!v || 'Obligatori']"
          />
          <q-input
            v-model="form.description"
            label="Descripció"
            outlined
            type="textarea"
            autogrow
          />
          <q-toggle v-model="form.completed" label="Completada" />

          <div class="row justify-end q-gutter-sm">
            <q-btn flat label="Cancel·lar" color="grey-7" v-close-popup />
            <q-btn type="submit" :label="isEdit ? 'Desar canvis' : 'Crear'" color="primary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, reactive, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  task: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue', 'save'])

const form = reactive({
  title: '',
  description: '',
  completed: false,
})

const isEdit = computed(() => Boolean(props.task?.id))

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

watch(
  () => props.task,
  (task) => {
    form.title = task?.title || ''
    form.description = task?.description || ''
    form.completed = Boolean(task?.completed)
  },
  { immediate: true },
)

function submitForm() {
  emit('save', {
    ...props.task,
    title: form.title,
    description: form.description,
    completed: form.completed,
  })
}
</script>
