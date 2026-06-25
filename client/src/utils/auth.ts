export function getStoredToken(): string | null {
  return localStorage.getItem('authToken')
}

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.')
    if (parts.length < 2) return null

    const base64Url = parts[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    )
    return JSON.parse(jsonPayload) as Record<string, unknown>
  } catch {
    return null
  }
}

export function isTokenValid(token: string | null): boolean {
  if (!token) return false

  const payload = decodeJwtPayload(token)
  if (!payload) return false

  // Standard JWT exp: seconds since epoch
  const exp = payload.exp
  if (typeof exp !== 'number') return false

  const nowSeconds = Math.floor(Date.now() / 1000)
  return exp > nowSeconds
}

export function clearAuthStorage() {
  localStorage.removeItem('authToken')
  localStorage.removeItem('authUser')
}

export function normalizeAuthState() {
  const token = getStoredToken()
  if (!isTokenValid(token)) {
    clearAuthStorage()
    return { isAuthenticated: false }
  }

  return { isAuthenticated: true }
}

