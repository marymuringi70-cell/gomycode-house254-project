import { Schema, model, Types, type InferSchemaType } from 'mongoose'

const propertySchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    type: { type: String, required: true, enum: ['rent', 'sale'] },
    propertyCategory: { type: String, required: true, enum: ['apartment', 'house', 'land', 'commercial'] },
    price: { type: Number, required: true, min: 0 },
    location: { type: String, required: true, trim: true, index: true },
    address: { type: String, required: true },
    amenities: [{ type: String, trim: true }],
    images: [{ type: String }],
    landlord: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bedrooms: { type: Number, default: 0, min: 0 },
    bathrooms: { type: Number, default: 0, min: 0 },
    views: { type: Number, default: 0 },
    inquiries: { type: Number, default: 0 },
  },
  { timestamps: true },
)

export type PropertyDocument = InferSchemaType<typeof propertySchema> & {
  landlord: Types.ObjectId
}

export const Property = model('Property', propertySchema)