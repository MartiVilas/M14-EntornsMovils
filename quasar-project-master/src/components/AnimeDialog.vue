<script setup>
import { computed, reactive, watch } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  anime: { type: Object, default: null },
  loading: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const defaultState = () => ({
  title: '',
  synopsis: '',
  genre: '',
  studio: '',
  episodes: 12,
  year: new Date().getFullYear(),
  status: 'En emisión',
  rating: 8,
  imageUrl: '',
  favorite: false
})

const form = reactive(defaultState())
const statusOptions = ['En emisión', 'Finalizado', 'Próximamente']

watch(
  () => props.anime,
  (value) => {
    Object.assign(form, value
      ? {
          title: value.title || '',
          synopsis: value.synopsis || '',
          genre: value.genre || '',
          studio: value.studio || '',
          episodes: value.episodes || 1,
          year: value.year || new Date().getFullYear(),
          status: value.status || 'En emisión',
          rating: value.rating || 1,
          imageUrl: value.imageUrl || '',
          favorite: Boolean(value.favorite)
        }
      : defaultState())
  },
  { immediate: true }
)

const isEditing = computed(() => Boolean(props.anime?.id))

function closeDialog () {
  emit('update:modelValue', false)
}

function submitForm () {
  emit('submit', {
    ...form,
    episodes: Number(form.episodes),
    year: Number(form.year),
    rating: Number(form.rating)
  })
}
</script>

<template>
  <q-dialog :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)">
    <q-card style="width: 100%; max-width: 640px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ isEditing ? 'Editar anime' : 'Nuevo anime' }}</div>
        <q-space />
        <q-btn flat round dense icon="close" @click="closeDialog" />
      </q-card-section>

      <q-card-section>
        <q-form class="q-gutter-md" @submit.prevent="submitForm">
          <q-input v-model="form.title" label="Título" filled lazy-rules :rules="[v => !!v || 'Obligatorio']" />
          <q-input v-model="form.synopsis" type="textarea" autogrow label="Sinopsis" filled />
          <q-input v-model="form.genre" label="Género" filled lazy-rules :rules="[v => !!v || 'Obligatorio']" />
          <q-input v-model="form.studio" label="Estudio" filled lazy-rules :rules="[v => !!v || 'Obligatorio']" />

          <div class="row q-col-gutter-md">
            <div class="col-12 col-sm-4">
              <q-input v-model.number="form.episodes" type="number" label="Episodios" filled min="1" />
            </div>
            <div class="col-12 col-sm-4">
              <q-input v-model.number="form.year" type="number" label="Año" filled min="1950" max="2100" />
            </div>
            <div class="col-12 col-sm-4">
              <q-select v-model="form.status" :options="statusOptions" label="Estado" filled />
            </div>
          </div>

          <q-input v-model="form.imageUrl" label="URL de imagen" filled />
          <div>
            <div class="text-subtitle2 q-mb-sm">Puntuación</div>
            <q-rating v-model="form.rating" size="2em" max="10" />
          </div>
          <q-toggle v-model="form.favorite" label="Marcar como favorito" />

          <div class="row justify-end q-gutter-sm">
            <q-btn flat label="Cancelar" @click="closeDialog" />
            <q-btn color="primary" :label="isEditing ? 'Guardar cambios' : 'Crear anime'" type="submit" :loading="loading" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>