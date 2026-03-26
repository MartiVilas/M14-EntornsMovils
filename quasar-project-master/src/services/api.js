import { getToken } from './storage'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://10.0.2.2:3000/api/mobile'

async function request (path, options = {}) {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers
  })

  const text = await response.text()
  let data = null

  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = text || null
  }

  if (!response.ok) {
    const message = data?.statusMessage || data?.message || data || 'Ha ocurrido un error en la API'
    throw new Error(message)
  }

  return data
}

export const api = {
  login (body) {
    return request('/login', {
      method: 'POST',
      body: JSON.stringify(body)
    })
  },
  register (body) {
    return request('/register', {
      method: 'POST',
      body: JSON.stringify(body)
    })
  },
  me () {
    return request('/me')
  },
  getAnimes () {
    return request('/animes')
  },
  createAnime (body) {
    return request('/animes', {
      method: 'POST',
      body: JSON.stringify(body)
    })
  },
  updateAnime (id, body) {
    return request(`/animes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body)
    })
  },
  deleteAnime (id) {
    return request(`/animes/${id}`, {
      method: 'DELETE'
    })
  }
}
