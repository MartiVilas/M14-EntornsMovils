import { and, eq } from 'drizzle-orm'
import { db } from '../../db/index'
import { animes } from '../../db/schema'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  const id = Number(getRouterParam(event, 'id'))

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID no válido'
    })
  }

  const [existingAnime] = await db
    .select()
    .from(animes)
    .where(and(
      eq(animes.id, id),
      eq(animes.userId, Number(user.id))
    ))
    .limit(1)

  if (!existingAnime) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Anime no encontrado'
    })
  }

  await db
    .delete(animes)
    .where(and(
      eq(animes.id, id),
      eq(animes.userId, Number(user.id))
    ))

  return { ok: true }
})