import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    items: [],
    isLoading: false,
  }),

  actions: {
    async fetchTasks() {
      this.isLoading = true
      try {
        const { data } = await api.get('/api/tasks')
        this.items = Array.isArray(data) ? data : data.tasks || []
        return this.items
      } finally {
        this.isLoading = false
      }
    },

    async createTask(payload) {
      const { data } = await api.post('/api/tasks', payload)
      await this.fetchTasks()
      return data
    },

    async updateTask(id, payload) {
      const { data } = await api.put(`/api/tasks/${id}`, payload)
      await this.fetchTasks()
      return data
    },

    async deleteTask(id) {
      const { data } = await api.delete(`/api/tasks/${id}`)
      this.items = this.items.filter((task) => task.id !== id)
      return data
    },
  },
})
