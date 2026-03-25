import { defineEventHandler } from 'h3'
import { requireMobileUser } from '../../utils/mobile-auth'

export default defineEventHandler((event) => {
  const user = requireMobileUser(event)
  return { user }
})