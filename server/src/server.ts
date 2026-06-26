import cors from 'cors'
import express, { type NextFunction, type Request, type Response } from 'express'
import { config } from 'dotenv'
import { dbConnect } from './db/db-connect.js'
import { authRouter } from './routes/authRoutes.js'
import { propertyRouter } from './routes/propertyRoutes.js'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'

config()

const app = express()
const port = Number(process.env.PORT ?? 5000)
const envOrigins = process.env.CLIENT_ORIGIN
const allowedOrigins = (envOrigins && envOrigins.length > 0)
  ? envOrigins.split(',').map((origin) => origin.trim()).filter(Boolean)
  : ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:5174', 'http://127.0.0.1:5174']

app.use(
  cors({
    origin: allowedOrigins,
    credentials: false,
  }),
)
app.use(express.json({ limit: '2mb' }))

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', port })
})

app.get('/', (_req, res) => {
  res.json({ message: 'House254 API is running' })
})

app.use('/api/auth', authRouter)
app.use('/api/properties', propertyRouter)

app.use(notFoundHandler)
app.use(errorHandler)

async function bootstrap() {
  await dbConnect()

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}

bootstrap().catch((error) => {
  const message = error instanceof Error ? error.message : String(error)
  console.error(`Failed to start server: ${message}`)
  process.exit(1)
})
