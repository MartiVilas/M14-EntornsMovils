# Nuxt Full Stack CRUD - AnimeVault

Proyecto base en **Nuxt full stack** adaptado como **web de información de animes** con:

- Nuxt + Vue
- SQLite + Drizzle ORM
- Autenticación con `nuxt-auth-utils`
- Login local con email/password
- OAuth opcional con GitHub
- CRUD completo del recurso `animes`
- Validación compartida con Zod
- Dashboard protegido con middleware
- Componentes de Nuxt UI (`UForm`, `UInput`, `UButton`, etc.)

## 1) Instalación

```bash
npm install
cp .env.example .env
npm run db:push
npm run dev
```

Después abre:

- `http://localhost:3000/register` para crear cuenta
- `http://localhost:3000/login` para iniciar sesión
- `http://localhost:3000/dashboard` para gestionar tu catálogo de animes

## 2) Variables de entorno

Crea un archivo `.env`:

```env
NUXT_SESSION_PASSWORD=pon_aqui_una_clave_de_al_menos_32_caracteres
DB_FILE_NAME=sqlite.db

# Opcional: OAuth con GitHub
NUXT_OAUTH_GITHUB_CLIENT_ID=
NUXT_OAUTH_GITHUB_CLIENT_SECRET=
```

## 3) Base de datos

Para crear o actualizar la base de datos local:

```bash
npm run db:push
```

## 4) Qué incluye la adaptación anime

Este proyecto ya deja hecho:

- tabla `animes` relacionada con `users` mediante `userId`
- endpoints:
  - `GET /api/animes`
  - `POST /api/animes`
  - `PUT /api/animes/:id`
  - `DELETE /api/animes/:id`
- protección con `requireUserSession(event)`
- dashboard protegido con middleware `auth`
- campos completos para fichas de anime:
  - título
  - sinopsis
  - género
  - estudio
  - episodios
  - año
  - estado
  - puntuación
  - imagen
  - favorito
- landing principal estilo catálogo anime
- tipos compartidos
- validación con Zod en frontend y backend
- feedback con `useToast()`

## 5) Uso recomendado

1. Crea una cuenta.
2. Entra al dashboard.
3. Añade fichas de anime con sus datos.
4. Marca favoritos y edita o elimina registros cuando quieras.

## 6) Ideas para ampliarlo

- integrar una API externa como Jikan
- crear filtros por género o estudio
- añadir búsqueda por título
- crear página pública de detalle por anime
- guardar reseñas o comentarios por usuario
