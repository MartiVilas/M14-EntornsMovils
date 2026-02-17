import { eq } from "drizzle-orm";
import * as schema from "../../db/schema";
import { registerUser, throwIfUserExists } from "~~/server/utils/registerUtils";

export default defineEventHandler(async (event) => {
  const { name, email, password } = await readBody(event);

  if (!name || !email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Falten camps",
    });
  }

  const existingUser = await useDb().query.users.findFirst({
    where: eq(schema.users.email, email),
  });
  if (existingUser) {
    throw createError({
      statusCode: 400,
      statusMessage: "El correo ya está registrado",
    });
  }

  await throwIfUserExists(email);

  const newUser = await registerUser(name, email, password);
  const { password: pass, ...userWihoutPassword } = newUser;
  await setUserSession(event, { user: userWihoutPassword });

  return userWihoutPassword;
});
