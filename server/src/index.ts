import cors from 'cors'
import express, { type NextFunction, type Request, type Response } from 'express'
import { config } from 'dotenv'
import { connectDb } from './config/db.js'
import { authRouter } from './routes/authRoutes.js'
import { propertyRouter } from './routes/propertyRoutes.js'

config()

const app = express()
const port = Number(process.env.PORT ?? 5000)
const allowedOrigins = (process.env.CLIENT_ORIGIN ?? 'http://localhost:5173').split(',').map((origin) => origin.trim())

app.use(cors({ origin: allowedOrigins, credentials: true }))
app.use(express.json({ limit: '2mb' }))

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', port })
})

app.get('/', (_req, res) => {
  res.json({ message: 'House254 API is running' })
})

app.use('/api/auth', authRouter)
app.use('/api/properties', propertyRouter)

app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const message = error instanceof Error ? error.message : 'Internal server error'
  const statusCode = typeof (error as { statusCode?: number })?.statusCode === 'number' ? (error as { statusCode: number }).statusCode : 500

  res.status(statusCode).json({ message })
})

async function bootstrap() {
  await connectDb()

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}

bootstrap().catch((error) => {
  const message = error instanceof Error ? error.message : String(error)
  console.error(`Failed to start server: ${message}`)
  process.exit(1)
})