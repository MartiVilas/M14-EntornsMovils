import { desc, eq } from 'drizzle-orm'
import { defineEventHandler } from 'h3'
import { db } from '../../../db/index'
import { animes } from '../../../db/schema'
import { requireMobileUser } from '../../../utils/mobile-auth'

export default defineEventHandler(async (event) => {
  const user = requireMobileUser(event)

  return await db
    .select()
    .from(animes)
    .where(eq(animes.userId, Number(user.id)))
    .orderBy(desc(animes.createdAt))
})