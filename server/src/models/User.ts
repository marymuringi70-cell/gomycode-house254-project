import mongoose, { Schema, type Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  role: 'seeker' | 'landlord' | 'admin'
  phoneNumber?: string
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['seeker', 'landlord', 'admin'], default: 'seeker' },
  phoneNumber: { type: String },
})

export const User = mongoose.model<IUser>('User', userSchema)