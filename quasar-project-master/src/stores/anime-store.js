import { defineStore } from 'pinia'
import { api } from 'src/services/api'

export const useAnimeStore = defineStore('animes', {
  state: () => ({
    items: [],
    isLoading: false
  }),

  actions: {
    async fetchAnimes () {
      this.isLoading = true
      try {
        const data = await api.getAnimes()
        this.items = Array.isArray(data) ? data : []
        return this.items
      } finally {
        this.isLoading = false
      }
    },

    async createAnime (payload) {
      const created = await api.createAnime(payload)
      await this.fetchAnimes()
      return created
    },

    async updateAnime (id, payload) {
      const updated = await api.updateAnime(id, payload)
      await this.fetchAnimes()
      return updated
    },

    async deleteAnime (id) {
      const result = await api.deleteAnime(id)
      this.items = this.items.filter((anime) => anime.id !== id)
      return result
    }
  }
})
