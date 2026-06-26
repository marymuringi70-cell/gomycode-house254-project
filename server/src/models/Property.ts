import mongoose, { Schema, type Document } from 'mongoose'

export interface IProperty extends Document {
  title: string
  description: string
  price: number
  location: string
  images: string[]
  landlord: mongoose.Types.ObjectId
  status: 'available' | 'rented' | 'sold'
}

const propertySchema = new Schema<IProperty>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  images: [{ type: String }],
  landlord: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['available', 'rented', 'sold'], default: 'available' },
})

export const Property = mongoose.model<IProperty>('Property', propertySchema)