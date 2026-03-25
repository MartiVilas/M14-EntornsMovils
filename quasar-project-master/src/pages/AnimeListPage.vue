<script setup>
import { computed, ref } from 'vue'
import { useQuasar } from 'quasar'
import AnimeDialog from 'src/components/AnimeDialog.vue'
import { api } from 'src/services/api'
import { logoutUser } from 'src/stores/auth'

const $q = useQuasar()
const loading = ref(false)
const dialogOpen = ref(false)
const dialogLoading = ref(false)
const selectedAnime = ref(null)
const search = ref('')
const animes = ref([])

const filteredAnimes = computed(() => {
  const term = search.value.trim().toLowerCase()

  if (!term) {
    return animes.value
  }

  return animes.value.filter((anime) => {
    return [anime.title, anime.genre, anime.studio, anime.status]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(term))
  })
})

const stats = computed(() => ({
  total: animes.value.length,
  favorites: animes.value.filter(anime => anime.favorite).length,
  finished: animes.value.filter(anime => anime.status === 'Finalizado').length
}))

async function loadAnimes () {
  loading.value = true

  try {
    animes.value = await api.getAnimes()
  } catch (error) {
    if (String(error.message || '').toLowerCase().includes('token')) {
      logoutUser()
      location.hash = '#/login'
      return
    }

    $q.notify({ type: 'negative', message: error.message || 'No se pudieron cargar los animes' })
  } finally {
    loading.value = false
  }
}

function openCreateDialog () {
  selectedAnime.value = null
  dialogOpen.value = true
}

function openEditDialog (anime) {
  selectedAnime.value = { ...anime }
  dialogOpen.value = true
}

async function saveAnime (payload) {
  dialogLoading.value = true

  try {
    if (selectedAnime.value?.id) {
      await api.updateAnime(selectedAnime.value.id, payload)
      $q.notify({ type: 'positive', message: 'Anime actualizado' })
    } else {
      await api.createAnime(payload)
      $q.notify({ type: 'positive', message: 'Anime creado' })
    }

    dialogOpen.value = false
    await loadAnimes()
  } catch (error) {
    $q.notify({ type: 'negative', message: error.message || 'No se pudo guardar el anime' })
  } finally {
    dialogLoading.value = false
  }
}

function confirmDelete (anime) {
  $q.dialog({
    title: 'Eliminar anime',
    message: `¿Seguro que quieres eliminar ${anime.title}?`,
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      await api.deleteAnime(anime.id)
      $q.notify({ type: 'positive', message: 'Anime eliminado' })
      await loadAnimes()
    } catch (error) {
      $q.notify({ type: 'negative', message: error.message || 'No se pudo eliminar el anime' })
    }
  })
}

loadAnimes()
</script>

<template>
  <q-page class="q-pa-md">
    <div class="row items-center q-col-gutter-md q-mb-md">
      <div class="col-12 col-md-6">
        <div class="text-h5 text-weight-bold">Mi biblioteca de anime</div>
        <div class="text-subtitle2 text-grey-7">Gestiona tu catálogo desde Android con Quasar</div>
      </div>
      <div class="col-12 col-md-6 row justify-end q-gutter-sm">
        <q-btn color="primary" icon="add" label="Nuevo anime" @click="openCreateDialog" />
        <q-btn flat icon="refresh" label="Recargar" :loading="loading" @click="loadAnimes" />
      </div>
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-12 col-sm-4">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle2 text-grey-7">Total</div>
            <div class="text-h5">{{ stats.total }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-4">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle2 text-grey-7">Favoritos</div>
            <div class="text-h5">{{ stats.favorites }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-4">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle2 text-grey-7">Finalizados</div>
            <div class="text-h5">{{ stats.finished }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-input v-model="search" filled clearable class="q-mb-md" label="Buscar por título, género, estudio o estado" />

    <div v-if="loading" class="row justify-center q-pa-lg">
      <q-spinner color="primary" size="48px" />
    </div>

    <div v-else-if="filteredAnimes.length === 0" class="text-center q-pa-xl text-grey-7">
      No hay animes para mostrar.
    </div>

    <div v-else class="row q-col-gutter-md">
      <div v-for="anime in filteredAnimes" :key="anime.id" class="col-12 col-sm-6 col-lg-4">
        <q-card class="full-height">
          <q-img
            v-if="anime.imageUrl"
            :src="anime.imageUrl"
            :ratio="3/4"
            spinner-color="primary"
            fit="cover"
          />
          <q-card-section>
            <div class="row items-start no-wrap">
              <div class="col">
                <div class="text-h6">{{ anime.title }}</div>
                <div class="text-subtitle2 text-grey-7">{{ anime.studio }}</div>
              </div>
              <q-chip v-if="anime.favorite" color="amber" text-color="black" icon="star">Favorito</q-chip>
            </div>

            <div class="q-mt-sm q-gutter-sm">
              <q-chip dense>{{ anime.genre }}</q-chip>
              <q-chip dense color="primary" text-color="white">{{ anime.status }}</q-chip>
            </div>

            <p class="q-mt-md text-body2 text-grey-8">
              {{ anime.synopsis || 'Sin sinopsis disponible.' }}
            </p>

            <div class="row q-col-gutter-sm q-mt-sm text-body2">
              <div class="col-6"><strong>Año:</strong> {{ anime.year }}</div>
              <div class="col-6"><strong>Episodios:</strong> {{ anime.episodes }}</div>
              <div class="col-12"><strong>Puntuación:</strong> {{ anime.rating }}/10</div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn flat color="primary" icon="edit" label="Editar" @click="openEditDialog(anime)" />
            <q-btn flat color="negative" icon="delete" label="Eliminar" @click="confirmDelete(anime)" />
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <AnimeDialog
      v-model="dialogOpen"
      :anime="selectedAnime"
      :loading="dialogLoading"
      @submit="saveAnime"
    />
  </q-page>
</template>