import { eq } from 'drizzle-orm'
import { db } from '../db/index'
import { users } from '../db/schema'
import { registerSchema } from '../../shared/schemas/auth'

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