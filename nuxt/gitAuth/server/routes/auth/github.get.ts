import { eq } from "drizzle-orm";
import * as schema from "../../db/schema";
export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user, tokens }) {
    await setUserSession(event, {
      user: {
        login: user.login,
      },
    });
    const db = useDb();
    if (!user.email) {
      throw createError({
        status: 500,
        statusMessage: "No s'ha proporcionat el correu",
      });
    }
    // El usuari de github existeix el usuari a la base de dades.
    let existingUser = await db.query.users.findFirst({
      where: eq(schema?.users?.email, user?.email),
    });
    if (!existingUser) {
      const result = db
        .insert(schema.users)
        .values({
          email: user.email,
          login: user.login,
          name: user.name,
        })
        .returning();
      existingUser = (await result).at(0);
    }
    if (!existingUser) {
      throw createError({
        status: 500,
        statusMessage: "Error autenticació github.",
      });
    }
    const { password, ...userWithoutPassword } = existingUser;
    await setUserSession(event, {
      user: {
        login: user.login,
      },
    });
    return sendRedirect(event, "/");
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error("GitHub OAuth error:", error);
    return sendRedirect(event, "/");
  },
});
