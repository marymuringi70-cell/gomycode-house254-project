import mongoose from 'mongoose'

export async function connectDb() {
  const mongoUri = process.env.MONGODB_URI

  if (!mongoUri) {
    console.warn('MONGODB_URI is not set; database connection skipped.')
    return
  }

  try {
    console.log('Attempting to connect to MongoDB...')
    console.log('Connection URI:', mongoUri.replace(/\/\/.*@/, '//***@')) // Hide credentials in log
    await mongoose.connect(mongoUri)
    console.log('Database connected successfully')
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error(`Failed to connect to database: ${message}`)
    console.error('\nPossible solutions:')
    console.error('1. Check if your MongoDB Atlas cluster is running (not paused)')
    console.error('2. Verify your IP address is whitelisted in MongoDB Atlas Network Access')
    console.error('3. Check your internet connection')
    console.error('4. Verify the connection string credentials are correct')
    console.error('5. Try using a local MongoDB instance: mongodb://localhost:27017/house254')
    throw error
  }
}
