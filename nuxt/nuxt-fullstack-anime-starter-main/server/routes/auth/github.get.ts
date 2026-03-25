import { eq } from 'drizzle-orm'
import { db } from '../../db/index'
import { users } from '../../db/schema'

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true
  },

  async onSuccess(event, { user }) {
    const githubId = String(user.id)
    const email = user.email

    if (!email) {
      return sendRedirect(event, '/login?error=github-email')
    }

    const existingByGithubRows = await db
      .select()
      .from(users)
      .where(eq(users.githubId, githubId))
      .limit(1)

    const existingByGithub = existingByGithubRows[0]

    if (existingByGithub) {
      await setUserSession(event, {
        user: {
          id: existingByGithub.id,
          name: existingByGithub.name,
          email: existingByGithub.email
        }
      })

      return sendRedirect(event, '/dashboard')
    }

    const existingByEmailRows = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    const existingByEmail = existingByEmailRows[0]

    if (existingByEmail) {
      const updatedRows = await db
        .update(users)
        .set({
          githubId,
          name: user.name || existingByEmail.name
        })
        .where(eq(users.id, existingByEmail.id))
        .returning()

      const updatedUser = updatedRows[0]

      if (!updatedUser) {
        throw createError({
          statusCode: 500,
          statusMessage: 'No se pudo actualizar el usuario'
        })
      }

      await setUserSession(event, {
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email
        }
      })

      return sendRedirect(event, '/dashboard')
    }

    const createdRows = await db
      .insert(users)
      .values({
        name: user.name || user.login || 'GitHub User',
        email,
        githubId
      })
      .returning()

    const createdUser = createdRows[0]

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

    return sendRedirect(event, '/dashboard')
  },

  onError(event) {
    return sendRedirect(event, '/login?error=github')
  }
})