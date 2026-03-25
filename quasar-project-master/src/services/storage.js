const TOKEN_KEY = 'anime_mobile_token'
const USER_KEY = 'anime_mobile_user'

export function getToken () {
  return localStorage.getItem(TOKEN_KEY) || ''
}

export function setToken (token) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken () {
  localStorage.removeItem(TOKEN_KEY)
}

export function getStoredUser () {
  const raw = localStorage.getItem(USER_KEY)
  return raw ? JSON.parse(raw) : null
}

export function setStoredUser (user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearStoredUser () {
  localStorage.removeItem(USER_KEY)
}

export function clearAuthStorage () {
  clearToken()
  clearStoredUser()
}

export function hasToken () {
  return Boolean(getToken())
}