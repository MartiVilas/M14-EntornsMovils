import { createHmac, timingSafeEqual } from 'node:crypto'
import type { H3Event } from 'h3'
import { createError, getHeader } from 'h3'
import { useRuntimeConfig } from '#imports'

export type MobileUserPayload = {
  id: number
  name: string
  email: string
}

type MobileTokenPayload = MobileUserPayload & {
  exp: number
}

function base64UrlEncode(value: string) {
  return Buffer.from(value, 'utf8').toString('base64url')
}

function base64UrlDecode(value: string) {
  return Buffer.from(value, 'base64url').toString('utf8')
}

function getSecret() {
  return useRuntimeConfig().mobileTokenSecret || 'change-me-mobile-secret'
}

function signValue(value: string) {
  return createHmac('sha256', getSecret()).update(value).digest('base64url')
}

export function createMobileToken(user: MobileUserPayload, maxAgeSeconds = 60 * 60 * 24 * 7) {
  const payload: MobileTokenPayload = {
    ...user,
    exp: Math.floor(Date.now() / 1000) + maxAgeSeconds
  }

  const encodedPayload = base64UrlEncode(JSON.stringify(payload))
  const signature = signValue(encodedPayload)

  return `${encodedPayload}.${signature}`
}

export function verifyMobileToken(token: string): MobileUserPayload | null {
  const [encodedPayload, signature] = token.split('.')

  if (!encodedPayload || !signature) {
    return null
  }

  const expectedSignature = signValue(encodedPayload)

  const signatureBuffer = Buffer.from(signature)
  const expectedBuffer = Buffer.from(expectedSignature)

  if (signatureBuffer.length !== expectedBuffer.length) {
    return null
  }

  if (!timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return null
  }

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as MobileTokenPayload

    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
      return null
    }

    return {
      id: Number(payload.id),
      name: payload.name,
      email: payload.email
    }
  } catch {
    return null
  }
}

export function getBearerToken(event: H3Event) {
  const authHeader = getHeader(event, 'authorization')

  if (!authHeader?.startsWith('Bearer ')) {
    return null
  }

  return authHeader.slice('Bearer '.length).trim()
}

export function requireMobileUser(event: H3Event) {
  const token = getBearerToken(event)

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Token no proporcionado'
    })
  }

  const user = verifyMobileToken(token)

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Token no válido o caducado'
    })
  }

  return user
}