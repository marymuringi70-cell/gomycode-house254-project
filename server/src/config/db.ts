import mongoose from 'mongoose'

export async function connectDb() {
  const mongoUri = process.env.MONGODB_URI

  if (!mongoUri) {
    console.warn('MONGODB_URI is not set; database connection skipped.')
    return
  }

  await mongoose.connect(mongoUri)
  console.log('Database connected successfully')
}