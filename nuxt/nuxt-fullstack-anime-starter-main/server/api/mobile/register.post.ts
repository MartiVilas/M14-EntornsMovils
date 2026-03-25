import { eq } from 'drizzle-orm'
import { defineEventHandler, readBody, createError } from 'h3'
import { hashPassword } from '#imports'
import { db } from '../../db/index'
import { users } from '../../db/schema'
import { registerSchema } from '../../../shared/schemas/auth'
import { createMobileToken } from '../../utils/mobile-auth'

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

  const [createdUser] = await db
    .insert(users)
    .values({
      name: parsed.name,
      email: parsed.email,
      passwordHash: await hashPassword(parsed.password)
    })
    .returning()

  if (!createdUser) {
    throw createError({
      statusCode: 500,
      statusMessage: 'No se pudo crear el usuario'
    })
  }

  const user = {
    id: createdUser.id,
    name: createdUser.name,
    email: createdUser.email
  }

  return {
    token: createMobileToken(user),
    user
  }
})