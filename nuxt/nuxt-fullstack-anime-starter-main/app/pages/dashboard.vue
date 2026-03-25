<script setup>
definePageMeta({
  middleware: 'auth'
})

const toast = useToast()
const { user, clear } = useUserSession()

const editingAnime = ref(null)
const formKey = ref(0)
const saving = ref(false)

const { data: animeList, refresh, status } = await useFetch('/api/animes', {
  default: () => []
})

const animes = computed(() => animeList.value || [])

const stats = computed(() => ({
  total: animes.value.length,
  favorites: animes.value.filter((anime) => anime.favorite).length,
  airing: animes.value.filter((anime) => anime.status === 'En emisión').length,
  averageRating: animes.value.length
    ? (animes.value.reduce((sum, anime) => sum + Number(anime.rating || 0), 0) / animes.value.length).toFixed(1)
    : '0.0'
}))

function formatDate(value) {
  if (!value) {
    return 'sin fecha'
  }

  return new Date(value).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

async function createAnime(payload) {
  saving.value = true

  try {
    await $fetch('/api/animes', {
      method: 'POST',
      body: payload
    })

    toast.add({
      title: 'Anime añadido',
      description: 'La ficha se ha guardado correctamente.'
    })

    formKey.value += 1
    await refresh()
  } catch (error) {
    toast.add({
      title: 'Error al guardar',
      description: 'No se pudo crear la ficha del anime.',
      color: 'error'
    })
  } finally {
    saving.value = false
  }
}

async function updateAnime(payload) {
  if (!editingAnime.value) {
    return
  }

  saving.value = true

  try {
    await $fetch(`/api/animes/${editingAnime.value.id}`, {
      method: 'PUT',
      body: payload
    })

    toast.add({
      title: 'Anime actualizado',
      description: 'Los cambios se han guardado correctamente.'
    })

    editingAnime.value = null
    formKey.value += 1
    await refresh()
  } catch (error) {
    toast.add({
      title: 'Error al actualizar',
      description: 'No se pudo actualizar la ficha.',
      color: 'error'
    })
  } finally {
    saving.value = false
  }
}

async function deleteAnime(id) {
  try {
    await $fetch(`/api/animes/${id}`, {
      method: 'DELETE'
    })

    if (editingAnime.value?.id === id) {
      editingAnime.value = null
      formKey.value += 1
    }

    toast.add({
      title: 'Anime eliminado',
      description: 'La ficha se ha eliminado del catálogo.'
    })

    await refresh()
  } catch (error) {
    toast.add({
      title: 'Error al eliminar',
      description: 'No se pudo eliminar el anime.',
      color: 'error'
    })
  }
}

function startEdit(anime) {
  editingAnime.value = { ...anime }
}

function cancelEdit() {
  editingAnime.value = null
  formKey.value += 1
}

async function logout() {
  await clear()
  await navigateTo('/login')
}
</script>

<template>
  <main class="min-h-screen bg-neutral-50 px-6 py-10 text-neutral-900">
    <div class="mx-auto max-w-7xl space-y-8">
      <header class="overflow-hidden rounded-3xl bg-gradient-to-r from-neutral-950 via-neutral-900 to-primary/80 p-[1px] shadow-xl shadow-neutral-300/30">
        <div class="flex h-full flex-col gap-5 rounded-[calc(1.5rem-1px)] bg-neutral-950/95 p-6 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-primary">Dashboard protegido</p>
            <h1 class="mt-1 text-3xl font-bold">Catálogo de animes</h1>
            <p class="mt-2 text-sm text-neutral-300">
              Usuario actual: {{ user?.name }} ({{ user?.email }})
            </p>
          </div>

          <div class="flex flex-wrap gap-3">
            <UButton color="neutral" variant="outline" to="/">
              Inicio
            </UButton>
            <UButton color="neutral" variant="outline" @click="logout">
              Cerrar sesión
            </UButton>
          </div>
        </div>
      </header>

      <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div class="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <p class="text-sm text-neutral-500">Total guardados</p>
          <p class="mt-2 text-3xl font-bold">{{ stats.total }}</p>
        </div>
        <div class="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <p class="text-sm text-neutral-500">Favoritos</p>
          <p class="mt-2 text-3xl font-bold">{{ stats.favorites }}</p>
        </div>
        <div class="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <p class="text-sm text-neutral-500">En emisión</p>
          <p class="mt-2 text-3xl font-bold">{{ stats.airing }}</p>
        </div>
        <div class="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <p class="text-sm text-neutral-500">Puntuación media</p>
          <p class="mt-2 text-3xl font-bold">{{ stats.averageRating }}</p>
        </div>
      </section>

      <section class="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
        <div class="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div class="mb-5">
            <h2 class="text-xl font-semibold">
              {{ editingAnime ? 'Editar anime' : 'Nuevo anime' }}
            </h2>
            <p class="mt-1 text-sm text-neutral-600">
              {{ editingAnime
                ? 'Actualiza la ficha seleccionada.'
                : 'Añade un anime a tu biblioteca privada con sus datos principales.' }}
            </p>
          </div>

          <AnimeForm
            :key="editingAnime ? `edit-${editingAnime.id}` : `create-${formKey}`"
            :initial-data="editingAnime"
            :submit-label="editingAnime ? 'Actualizar anime' : 'Guardar anime'"
            :loading="saving"
            :show-cancel="Boolean(editingAnime)"
            @submit="editingAnime ? updateAnime($event) : createAnime($event)"
            @cancel="cancelEdit"
          />
        </div>

        <div class="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 class="text-xl font-semibold">Tu biblioteca</h2>
              <p class="text-sm text-neutral-600">
                Todas las fichas están asociadas a tu cuenta.
              </p>
            </div>

            <UButton color="neutral" variant="outline" @click="refresh">
              Recargar
            </UButton>
          </div>

          <div v-if="status === 'pending'" class="py-12 text-center text-sm text-neutral-500">
            Cargando catálogo...
          </div>

          <div v-else-if="!animes.length" class="rounded-2xl border border-dashed border-neutral-300 p-10 text-center text-sm text-neutral-500">
            Aún no tienes animes guardados. Crea la primera ficha desde el formulario.
          </div>

          <div v-else class="grid gap-5 lg:grid-cols-2">
            <article
              v-for="anime in animes"
              :key="anime.id"
              class="overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
            >
              <div class="grid min-h-full md:grid-cols-[160px_minmax(0,1fr)]">
                <div class="border-b border-neutral-200 bg-gradient-to-br from-primary/15 via-fuchsia-500/10 to-cyan-400/10 md:border-b-0 md:border-r">
                  <img
                    v-if="anime.imageUrl"
                    :src="anime.imageUrl"
                    :alt="anime.title"
                    class="h-full min-h-48 w-full object-cover"
                  >
                  <div v-else class="flex h-full min-h-48 items-center justify-center p-6 text-center text-sm font-medium text-neutral-500">
                    Sin portada
                  </div>
                </div>

                <div class="flex flex-col p-5">
                  <div class="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div class="flex flex-wrap items-center gap-2">
                        <h3 class="text-lg font-semibold text-neutral-900">
                          {{ anime.title }}
                        </h3>
                        <span
                          v-if="anime.favorite"
                          class="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700"
                        >
                          Favorito
                        </span>
                      </div>
                      <p class="mt-1 text-sm text-neutral-500">
                        {{ anime.genre }} · {{ anime.studio }}
                      </p>
                    </div>

                    <span class="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {{ anime.status }}
                    </span>
                  </div>

                  <div class="mt-4 grid grid-cols-3 gap-3 text-sm">
                    <div class="rounded-2xl bg-white p-3">
                      <p class="text-neutral-500">Episodios</p>
                      <p class="mt-1 font-semibold">{{ anime.episodes }}</p>
                    </div>
                    <div class="rounded-2xl bg-white p-3">
                      <p class="text-neutral-500">Año</p>
                      <p class="mt-1 font-semibold">{{ anime.year }}</p>
                    </div>
                    <div class="rounded-2xl bg-white p-3">
                      <p class="text-neutral-500">Puntuación</p>
                      <p class="mt-1 font-semibold">{{ anime.rating }}/10</p>
                    </div>
                  </div>

                  <p class="mt-4 line-clamp-5 whitespace-pre-wrap text-sm leading-6 text-neutral-600">
                    {{ anime.synopsis || 'Sin sinopsis todavía.' }}
                  </p>

                  <div class="mt-5 flex items-center justify-between gap-4 border-t border-neutral-200 pt-4">
                    <p class="text-xs text-neutral-400">
                      Creado: {{ formatDate(anime.createdAt) }}
                    </p>

                    <div class="flex flex-wrap gap-2">
                      <UButton size="sm" color="neutral" variant="outline" @click="startEdit(anime)">
                        Editar
                      </UButton>
                      <UButton size="sm" color="error" variant="outline" @click="deleteAnime(anime.id)">
                        Eliminar
                      </UButton>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
