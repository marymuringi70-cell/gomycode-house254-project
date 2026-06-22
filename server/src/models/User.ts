import { Schema, model, type InferSchemaType } from 'mongoose'

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true, trim: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ['seeker', 'landlord', 'admin'],
      default: 'seeker',
    },
    phoneNumber: { type: String, trim: true },
  },
  { timestamps: true },
)

export type UserDocument = InferSchemaType<typeof userSchema>

export const User = model('User', userSchema)