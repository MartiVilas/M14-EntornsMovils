<script setup>
const { loggedIn, user, clear, ready } = useUserSession()

const featuredAnimes = [
  {
    title: 'Fullmetal Alchemist: Brotherhood',
    genre: 'Acción · Fantasía',
    rating: '10/10',
    description: 'Una historia intensa sobre alquimia, sacrificio y crecimiento personal con uno de los mejores cierres del anime.',
    badge: 'Clásico imprescindible'
  },
  {
    title: 'Frieren: Beyond Journey\'s End',
    genre: 'Aventura · Drama · Fantasía',
    rating: '9/10',
    description: 'Viaje emocional y contemplativo que explora el paso del tiempo y la memoria después de derrotar al rey demonio.',
    badge: 'Tendencia actual'
  },
  {
    title: 'Attack on Titan',
    genre: 'Acción · Oscuro · Misterio',
    rating: '9/10',
    description: 'Un fenómeno moderno con giros, conflictos políticos y uno de los universos más comentados del anime reciente.',
    badge: 'Épico'
  },
  {
    title: 'Demon Slayer',
    genre: 'Shonen · Aventura',
    rating: '8/10',
    description: 'Combates espectaculares, animación sobresaliente y un elenco carismático que engancha desde el primer arco.',
    badge: 'Visualmente brutal'
  }
]

const highlights = [
  'Catálogo privado por usuario con login y registro',
  'CRUD completo para guardar fichas de anime',
  'Campos de estudio, géneros, episodios, año, puntuación e imagen',
  'Dashboard protegido con SQLite y Drizzle ORM'
]

async function logout() {
  await clear()
  await navigateTo('/login')
}
</script>

<template>
  <main class="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white">
    <section class="border-b border-white/10">
      <div class="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-16 lg:flex-row lg:items-center lg:justify-between">
        <div class="max-w-3xl space-y-6">
          <div class="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-sm text-primary">
            AnimeVault · información y catálogo personal de anime
          </div>

          <div class="space-y-4">
            <h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Tu web de información de animes con panel privado y fichas completas
            </h1>
            <p class="max-w-2xl text-base leading-7 text-neutral-300 sm:text-lg">
              Explora títulos destacados, guarda tus favoritos y gestiona tu propia base de datos
              de anime con autenticación, formularios validados y dashboard protegido.
            </p>
          </div>

          <div v-if="ready" class="flex flex-wrap gap-3">
            <template v-if="loggedIn">
              <UButton to="/dashboard" size="xl" trailing-icon="i-lucide-arrow-right">
                Ir a mi catálogo
              </UButton>
              <UButton color="neutral" variant="outline" size="xl" @click="logout">
                Cerrar sesión
              </UButton>
              <span class="flex items-center text-sm text-neutral-300">
                Sesión activa: {{ user?.name }} ({{ user?.email }})
              </span>
            </template>

            <template v-else>
              <UButton to="/login" size="xl" trailing-icon="i-lucide-arrow-right">
                Iniciar sesión
              </UButton>
              <UButton to="/register" color="neutral" variant="outline" size="xl">
                Crear cuenta
              </UButton>
            </template>
          </div>
        </div>

        <div class="grid w-full max-w-xl gap-3 sm:grid-cols-2">
          <div
            v-for="item in highlights"
            :key="item"
            class="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/10 backdrop-blur"
          >
            <div class="mb-3 inline-flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
              ★
            </div>
            <p class="text-sm leading-6 text-neutral-200">
              {{ item }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-6 py-16">
      <div class="mb-8 flex items-end justify-between gap-4">
        <div>
          <p class="text-sm uppercase tracking-[0.2em] text-primary">Selección destacada</p>
          <h2 class="mt-2 text-3xl font-bold">Animes para inspirar tu catálogo</h2>
        </div>
        <NuxtLink to="/dashboard" class="text-sm font-medium text-primary hover:underline">
          Abrir dashboard →
        </NuxtLink>
      </div>

      <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="anime in featuredAnimes"
          :key="anime.title"
          class="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl shadow-black/10"
        >
          <div class="flex h-48 items-end bg-gradient-to-br from-primary/40 via-fuchsia-500/20 to-cyan-400/20 p-5">
            <span class="rounded-full border border-white/15 bg-black/20 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur">
              {{ anime.badge }}
            </span>
          </div>

          <div class="space-y-4 p-5">
            <div>
              <p class="text-xs uppercase tracking-[0.2em] text-neutral-400">{{ anime.genre }}</p>
              <h3 class="mt-2 text-xl font-semibold text-white">{{ anime.title }}</h3>
            </div>

            <p class="text-sm leading-6 text-neutral-300">
              {{ anime.description }}
            </p>

            <div class="flex items-center justify-between border-t border-white/10 pt-4 text-sm text-neutral-300">
              <span>Puntuación</span>
              <span class="font-semibold text-primary">{{ anime.rating }}</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>
