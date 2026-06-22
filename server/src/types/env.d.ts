declare const process: {
  env: Record<string, string | undefined>
  exit(code?: number): never
}

declare namespace Express {
  interface Request {
    user?: {
      id: string
      role?: 'seeker' | 'landlord' | 'admin'
    }
  }
}