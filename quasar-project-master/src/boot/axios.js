import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://10.0.2.2:3000'

const api = axios.create({
  baseURL,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default defineBoot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api, baseURL }
