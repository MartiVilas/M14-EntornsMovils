import { reactive } from 'vue'
import { clearAuthStorage, getStoredUser, getToken, setStoredUser, setToken } from 'src/services/storage'
import { api } from 'src/services/api'

export const authState = reactive({
  token: getToken(),
  user: getStoredUser()
})

export function saveSession (payload) {
  authState.token = payload.token
  authState.user = payload.user
  setToken(payload.token)
  setStoredUser(payload.user)
}

export async function loginUser (credentials) {
  const payload = await api.login(credentials)
  saveSession(payload)
  return payload
}

export async function registerUser (credentials) {
  const payload = await api.register(credentials)
  saveSession(payload)
  return payload
}

export async function fetchMe () {
  if (!authState.token) {
    return null
  }

  const payload = await api.me()
  authState.user = payload.user
  setStoredUser(payload.user)
  return payload.user
}

export function logoutUser () {
  authState.token = ''
  authState.user = null
  clearAuthStorage()
}