import { and, eq } from 'drizzle-orm'
import { defineEventHandler, readBody, createError, getRouterParam } from 'h3'
import { db } from '../../../db/index'
import { animes } from '../../../db/schema'
import { animeSchema } from '../../../../shared/schemas/anime'
import { requireMobileUser } from '../../../utils/mobile-auth'

export default defineEventHandler(async (event) => {
  const user = requireMobileUser(event)
  const id = Number(getRouterParam(event, 'id'))

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID no válido'
    })
  }

  const body = await readBody(event)
  const parsed = animeSchema.parse(body)

  const [existingAnime] = await db
    .select()
    .from(animes)
    .where(and(eq(animes.id, id), eq(animes.userId, Number(user.id))))
    .limit(1)

  if (!existingAnime) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Anime no encontrado'
    })
  }

  const [updatedAnime] = await db
    .update(animes)
    .set({
      title: parsed.title,
      synopsis: parsed.synopsis || null,
      genre: parsed.genre,
      studio: parsed.studio,
      episodes: parsed.episodes,
      year: parsed.year,
      status: parsed.status,
      rating: parsed.rating,
      imageUrl: parsed.imageUrl || null,
      favorite: parsed.favorite ?? false
    })
    .where(and(eq(animes.id, id), eq(animes.userId, Number(user.id))))
    .returning()

  return updatedAnime
})