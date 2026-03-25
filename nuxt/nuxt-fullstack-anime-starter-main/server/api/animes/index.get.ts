import { desc, eq } from 'drizzle-orm'
import { db } from '../../db/index'
import { animes } from '../../db/schema'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  return await db
    .select()
    .from(animes)
    .where(eq(animes.userId, Number(user.id)))
    .orderBy(desc(animes.createdAt))
})
