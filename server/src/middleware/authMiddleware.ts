import type { NextFunction, Request, Response } from 'express'
import { verifyToken } from '../utils/jwt.js'

export function authenticateUser(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing bearer token' })
  }

  try {
    const token = authHeader.slice(7)
    const decoded = verifyToken(token)

    req.user = { id: decoded.id, role: decoded.role }
    return next()
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}

export function authorizeRoles(...roles: Array<'landlord' | 'admin'>) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?.role || !roles.includes(req.user.role as 'landlord' | 'admin')) {
      return res.status(403).json({ message: 'Insufficient permissions' })
    }

    return next()
  }
}