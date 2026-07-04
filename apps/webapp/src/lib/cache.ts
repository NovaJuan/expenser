import type { AuthUser } from '../services/auth'

const USER_KEY = 'expenser-user'
const HOME_KEY = 'expenser-home'

function read<T>(key: string): T | null {
  if (typeof localStorage === 'undefined') return null
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

function write(key: string, value: unknown): void {
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // storage full or unavailable — caching is best-effort
  }
}

export function readUserCache(): AuthUser | null {
  return read<AuthUser>(USER_KEY)
}

export function writeUserCache(user: AuthUser): void {
  write(USER_KEY, user)
}

/** Wipe all cached account data — call on logout or when auth is rejected. */
export function clearCache(): void {
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(HOME_KEY)
  } catch {
    // ignore
  }
}
