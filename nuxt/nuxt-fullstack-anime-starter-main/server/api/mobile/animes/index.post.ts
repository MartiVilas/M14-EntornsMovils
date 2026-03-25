import { defineEventHandler, readBody } from 'h3'
import { db } from '../../../db/index'
import { animes } from '../../../db/schema'
import { animeSchema } from '../../../../shared/schemas/anime'
import { requireMobileUser } from '../../../utils/mobile-auth'

export default defineEventHandler(async (event) => {
  const user = requireMobileUser(event)
  const body = await readBody(event)
  const parsed = animeSchema.parse(body)

  const [createdAnime] = await db
    .insert(animes)
    .values({
      title: parsed.title,
      synopsis: parsed.synopsis || null,
      genre: parsed.genre,
      studio: parsed.studio,
      episodes: parsed.episodes,
      year: parsed.year,
      status: parsed.status,
      rating: parsed.rating,
      imageUrl: parsed.imageUrl || null,
      favorite: parsed.favorite ?? false,
      userId: Number(user.id)
    })
    .returning()

  return createdAnime
})