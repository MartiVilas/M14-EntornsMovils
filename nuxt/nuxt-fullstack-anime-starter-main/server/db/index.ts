import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from './schema'

const sqlite = new Database(process.env.DB_FILE_NAME || 'sqlite.db')

const existingUser = sqlite
  .prepare('SELECT id FROM users LIMIT 1')
  .get() as { id: number } | undefined

let demoUserId = existingUser?.id

if (!demoUserId) {
  const result = sqlite
    .prepare(`
      INSERT INTO users (name, email, password_hash)
      VALUES (?, ?, ?)
    `)
    .run('Marti Demo', 'demo@anime.com', 'demo1234')

  demoUserId = Number(result.lastInsertRowid)
}

const animeCountRow = sqlite
  .prepare('SELECT COUNT(*) as count FROM animes')
  .get() as { count: number }

if (animeCountRow.count === 0) {
  const insertAnime = sqlite.prepare(`
    INSERT INTO animes (
      title,
      synopsis,
      genre,
      studio,
      episodes,
      year,
      status,
      rating,
      image_url,
      favorite,
      user_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  const animes = [
    [
      'Kaoru Hana wa Rin to Saku',
      'Una historia romántica escolar sobre Rintaro y Kaoruko, con un tono calmado y emotivo.',
      'Romance, School, Slice of Life',
      'CloverWorks',
      12,
      2025,
      'En emisión',
      9,
      'https://preview.redd.it/kaoru-hana-wa-rin-to-saku-the-fragrant-flower-blooms-with-v0-qbqxt9ht285f1.jpeg?auto=webp&s=a236a47f615607f284a06a7658bf6c321421ce49',
      1,
      demoUserId
    ],
    [
      'The Apothecary Diaries',
      'Maomao usa sus conocimientos de medicina para resolver misterios dentro del palacio imperial.',
      'Mystery, Drama, Historical',
      'TOHO Animation / OLM',
      24,
      2023,
      'Finalizado',
      10,
      'https://static.wikia.nocookie.net/wiki-doblaje-espana/images/6/66/Los_diarios_de_la_boticaria.png/revision/latest/thumbnail/width/360/height/360?cb=20241118230110&path-prefix=es',
      1,
      demoUserId
    ],
    [
      'Fullmetal Alchemist: Brotherhood',
      'Dos hermanos alquimistas buscan la piedra filosofal tras un experimento fallido.',
      'Action, Adventure, Fantasy',
      'Bones',
      64,
      2009,
      'Finalizado',
      10,
      'https://static.wikia.nocookie.net/fma/images/5/5f/FMA-Brotherhood_Poster_Vol02a.JPG/revision/latest?cb=20120107230603&path-prefix=es',
      1,
      demoUserId
    ],
    [
      'Bungo Stray Dogs',
      'Una agencia de detectives con poderes sobrenaturales se enfrenta a organizaciones criminales.',
      'Action, Supernatural, Mystery',
      'Bones',
      61,
      2016,
      'En emisión',
      8,
      'https://m.media-amazon.com/images/M/MV5BYzA5Y2MzNDAtZjBjZi00OTUzLWI5NDAtMTg1ODRhMmU2MGY3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
      0,
      demoUserId
    ],
    [
      'Sousou no Frieren',
      'Tras derrotar al Rey Demonio, Frieren inicia un nuevo viaje para comprender mejor a los humanos.',
      'Fantasy, Adventure, Drama',
      'Madhouse',
      28,
      2023,
      'Finalizado',
      10,
      'https://via.placeholder.com/300x450?text=Frieren',
      1,
      demoUserId
    ]
  ]

  const insertMany = sqlite.transaction((rows) => {
    for (const anime of rows) {
      insertAnime.run(...anime)
    }
  })

  insertMany(animes)
}

export const db = drizzle(sqlite, { schema })
