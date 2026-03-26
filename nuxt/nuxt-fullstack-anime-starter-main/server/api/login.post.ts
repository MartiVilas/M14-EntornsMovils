import { eq } from 'drizzle-orm'
import { db } from '../db/index'
import { users } from '../db/schema'
import { loginSchema } from '../../shared/schemas/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = loginSchema.parse(body)

  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, parsed.email))
    .limit(1)

  if (!existingUser || !existingUser.passwordHash) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Credenciales inválidas'
    })
  }

  const isValidPassword = await verifyPassword(existingUser.passwordHash, parsed.password)

  if (!isValidPassword) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Credenciales inválidas'
    })
  }

  await setUserSession(event, {
    user: {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email
    }
  })

  return {
    ok: true
  }
})