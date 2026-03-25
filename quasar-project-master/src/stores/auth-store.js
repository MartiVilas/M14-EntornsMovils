import { defineStore } from 'pinia'
import { api } from 'boot/axios'

const STORAGE_KEY = 'quasar-auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isLoading: false,
  }),

  getters: {
    isAuthenticated: (state) => Boolean(state.token),
  },

  actions: {
    loadFromStorage() {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return

      try {
        const parsed = JSON.parse(raw)
        this.user = parsed.user || null
        this.token = parsed.token || null
        this.applyToken()
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    },

    persist() {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          user: this.user,
          token: this.token,
        }),
      )
    },

    applyToken() {
      if (this.token) {
        api.defaults.headers.common.Authorization = `Bearer ${this.token}`
      } else {
        delete api.defaults.headers.common.Authorization
      }
    },

    async login(credentials) {
      this.isLoading = true
      try {
        const { data } = await api.post('/api/auth/login', credentials)
        this.user = data.user || null
        this.token = data.token || null
        this.applyToken()
        this.persist()
        return data
      } finally {
        this.isLoading = false
      }
    },

    async register(payload) {
      this.isLoading = true
      try {
        const { data } = await api.post('/api/auth/register', payload)
        return data
      } finally {
        this.isLoading = false
      }
    },

    logout() {
      this.user = null
      this.token = null
      this.applyToken()
      localStorage.removeItem(STORAGE_KEY)
    },
  },
})
