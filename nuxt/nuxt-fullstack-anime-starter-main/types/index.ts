export interface UserPublic {
  id: number
  name: string
  email: string
}

export interface Anime {
  id: number
  title: string
  synopsis: string | null
  genre: string
  studio: string
  episodes: number
  year: number
  status: 'En emisión' | 'Finalizado' | 'Próximamente'
  rating: number
  imageUrl: string | null
  favorite: boolean
  userId: number
  createdAt: string
}
