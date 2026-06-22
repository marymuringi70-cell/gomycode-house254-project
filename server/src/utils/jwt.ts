import jwt from 'jsonwebtoken'

const jwtSecret = process.env.JWT_SECRET ?? 'development-secret'

export function signToken(payload: { id: string; role?: string }) {
  return jwt.sign(payload, jwtSecret, { expiresIn: '7d' })
}

export function verifyToken(token: string) {
  return jwt.verify(token, jwtSecret) as { id: string; role?: 'seeker' | 'landlord' | 'admin' }
}