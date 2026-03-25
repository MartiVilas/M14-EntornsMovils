import { sql } from 'drizzle-orm'
import { index } from 'drizzle-orm/sqlite-core'
import { integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  passwordHash: text('password_hash'),
  githubId: text('github_id'),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`)
}, (table) => [
  uniqueIndex('users_email_idx').on(table.email),
  uniqueIndex('users_github_id_idx').on(table.githubId)
])

export const animes = sqliteTable('animes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  synopsis: text('synopsis'),
  genre: text('genre').notNull(),
  studio: text('studio').notNull(),
  episodes: integer('episodes').notNull(),
  year: integer('year').notNull(),
  status: text('status').notNull(),
  rating: integer('rating').notNull().default(1),
  imageUrl: text('image_url'),
  favorite: integer('favorite', { mode: 'boolean' }).notNull().default(false),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`)
}, (table) => [
  index('animes_user_id_idx').on(table.userId)
])
