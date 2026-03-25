<script setup>
import { animeSchema, animeStatusOptions } from '~~/shared/schemas/anime'

const props = defineProps({
  initialData: {
    type: Object,
    default: null
  },
  submitLabel: {
    type: String,
    default: 'Guardar anime'
  },
  loading: {
    type: Boolean,
    default: false
  },
  showCancel: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit', 'cancel'])

const state = reactive({
  title: '',
  synopsis: '',
  genre: '',
  studio: '',
  episodes: 12,
  year: new Date().getFullYear(),
  status: animeStatusOptions[0],
  rating: 8,
  imageUrl: '',
  favorite: false
})

function syncState() {
  state.title = props.initialData?.title ?? ''
  state.synopsis = props.initialData?.synopsis ?? ''
  state.genre = props.initialData?.genre ?? ''
  state.studio = props.initialData?.studio ?? ''
  state.episodes = props.initialData?.episodes ?? 12
  state.year = props.initialData?.year ?? new Date().getFullYear()
  state.status = props.initialData?.status ?? animeStatusOptions[0]
  state.rating = props.initialData?.rating ?? 8
  state.imageUrl = props.initialData?.imageUrl ?? ''
  state.favorite = props.initialData?.favorite ?? false
}

watch(() => props.initialData, syncState, { immediate: true, deep: true })

function onSubmit(event) {
  emit('submit', event.data)
}
</script>

<template>
  <UForm :schema="animeSchema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormField label="Título" name="title">
      <UInput v-model="state.title" placeholder="Ej: Fullmetal Alchemist: Brotherhood" class="w-full" />
    </UFormField>

    <div class="grid gap-4 sm:grid-cols-2">
      <UFormField label="Género" name="genre">
        <UInput v-model="state.genre" placeholder="Shonen, fantasía, acción" class="w-full" />
      </UFormField>

      <UFormField label="Estudio" name="studio">
        <UInput v-model="state.studio" placeholder="Bones, MAPPA, Kyoto Animation..." class="w-full" />
      </UFormField>
    </div>

    <div class="grid gap-4 sm:grid-cols-3">
      <UFormField label="Episodios" name="episodes">
        <UInput v-model="state.episodes" type="number" min="1" class="w-full" />
      </UFormField>

      <UFormField label="Año" name="year">
        <UInput v-model="state.year" type="number" min="1950" max="2100" class="w-full" />
      </UFormField>

      <UFormField label="Puntuación" name="rating">
        <UInput v-model="state.rating" type="number" min="1" max="10" class="w-full" />
      </UFormField>
    </div>

    <UFormField label="Estado" name="status">
      <UInput v-model="state.status" placeholder="En emisión / Finalizado / Próximamente" class="w-full" />
    </UFormField>

    <UFormField label="Imagen (URL)" name="imageUrl">
      <UInput v-model="state.imageUrl" type="url" placeholder="https://..." class="w-full" />
    </UFormField>

    <UFormField label="Sinopsis" name="synopsis">
      <UTextarea
        v-model="state.synopsis"
        placeholder="Resume la historia, personajes o puntos fuertes del anime"
        :rows="5"
        class="w-full"
      />
    </UFormField>

    <UCheckbox
      v-model="state.favorite"
      label="Marcar como favorito"
      description="Úsalo para destacar tus animes preferidos dentro del catálogo."
    />

    <div class="flex flex-wrap gap-3 pt-2">
      <UButton type="submit" :loading="loading">
        {{ submitLabel }}
      </UButton>

      <UButton
        v-if="showCancel"
        type="button"
        color="neutral"
        variant="outline"
        @click="emit('cancel')"
      >
        Cancelar
      </UButton>
    </div>
  </UForm>
</template>
