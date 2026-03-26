import { eq } from 'drizzle-orm'
import { db } from '../db/index'
import { users, animes } from '../db/schema'
import { registerSchema } from '../../shared/schemas/auth'

const SEED_ANIMES = [
  {
    title: 'Kaoru Hana wa Rin to Saku',
    synopsis: 'Una historia romántica escolar sobre Rintaro y Kaoruko, con un tono calmado y emotivo.',
    genre: 'Romance, School, Slice of Life',
    studio: 'CloverWorks',
    episodes: 12,
    year: 2025,
    status: 'En emisión',
    rating: 9,
    imageUrl: 'https://preview.redd.it/kaoru-hana-wa-rin-to-saku-the-fragrant-flower-blooms-with-v0-qbqxt9ht285f1.jpeg?auto=webp&s=a236a47f615607f284a06a7658bf6c321421ce49',
    favorite: true
  },
  {
    title: 'The Apothecary Diaries',
    synopsis: 'Maomao usa sus conocimientos de medicina para resolver misterios dentro del palacio imperial.',
    genre: 'Mystery, Drama, Historical',
    studio: 'TOHO Animation / OLM',
    episodes: 24,
    year: 2023,
    status: 'Finalizado',
    rating: 10,
    imageUrl: 'https://static.wikia.nocookie.net/wiki-doblaje-espana/images/6/66/Los_diarios_de_la_boticaria.png/revision/latest/thumbnail/width/360/height/360?cb=20241118230110&path-prefix=es',
    favorite: true
  },
  {
    title: 'Fullmetal Alchemist: Brotherhood',
    synopsis: 'Dos hermanos alquimistas buscan la piedra filosofal tras un experimento fallido.',
    genre: 'Action, Adventure, Fantasy',
    studio: 'Bones',
    episodes: 64,
    year: 2009,
    status: 'Finalizado',
    rating: 10,
    imageUrl: 'https://static.wikia.nocookie.net/fma/images/5/5f/FMA-Brotherhood_Poster_Vol02a.JPG/revision/latest?cb=20120107230603&path-prefix=es',
    favorite: true
  },
  {
    title: 'Bungo Stray Dogs',
    synopsis: 'Una agencia de detectives con poderes sobrenaturales se enfrenta a organizaciones criminales.',
    genre: 'Action, Supernatural, Mystery',
    studio: 'Bones',
    episodes: 61,
    year: 2016,
    status: 'En emisión',
    rating: 8,
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BYzA5Y2MzNDAtZjBjZi00OTUzLWI5NDAtMTg1ODRhMmU2MGY3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    favorite: false
  },
  {
    title: 'Sousou no Frieren',
    synopsis: 'Tras derrotar al Rey Demonio, Frieren inicia un nuevo viaje para comprender mejor a los humanos.',
    genre: 'Fantasy, Adventure, Drama',
    studio: 'Madhouse',
    episodes: 28,
    year: 2023,
    status: 'Finalizado',
    rating: 10,
    imageUrl: 'https://via.placeholder.com/300x450?text=Frieren',
    favorite: true
  }
]

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = registerSchema.parse(body)

  const existing = await db
    .select()
    .from(users)
    .where(eq(users.email, parsed.email))
    .limit(1)

  if (existing.length > 0) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Ya existe una cuenta con ese email'
    })
  }

  const createdUsers = await db
    .insert(users)
    .values({
      name: parsed.name,
      email: parsed.email,
      passwordHash: await hashPassword(parsed.password)
    })
    .returning()

  const createdUser = createdUsers[0]

  if (!createdUser) {
    throw createError({
      statusCode: 500,
      statusMessage: 'No se pudo crear el usuario'
    })
  }

  await db.insert(animes).values(
    SEED_ANIMES.map(anime => ({ ...anime, userId: createdUser.id }))
  )

  await setUserSession(event, {
    user: {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email
    }
  })

  return {
    id: createdUser.id,
    name: createdUser.name,
    email: createdUser.email
  }
})