import type { Request, Response } from 'express'
import { Types } from 'mongoose'
import { Property } from '../models/Property.js'

function buildFilterFromQuery(query: Request['query']) {
  const filter: Record<string, unknown> = {}

  if (typeof query.location === 'string' && query.location !== 'all') {
    filter.location = { $regex: query.location, $options: 'i' }
  }

  if (typeof query.propertyCategory === 'string' && query.propertyCategory !== 'all') {
    filter.propertyCategory = query.propertyCategory
  }

  if (typeof query.type === 'string' && query.type !== 'all') {
    filter.type = query.type
  }

  const minPrice = Number(query.minPrice)
  const maxPrice = Number(query.maxPrice)

  if (!Number.isNaN(minPrice) || !Number.isNaN(maxPrice)) {
    filter.price = {}
    if (!Number.isNaN(minPrice)) {
      ;(filter.price as Record<string, number>).$gte = minPrice
    }
    if (!Number.isNaN(maxPrice)) {
      ;(filter.price as Record<string, number>).$lte = maxPrice
    }
  }

  return filter
}

export async function getProperties(req: Request, res: Response) {
  const page = Math.max(Number(req.query.page ?? 1), 1)
  const limit = Math.max(Number(req.query.limit ?? 12), 1)
  const skip = (page - 1) * limit
  const filter = buildFilterFromQuery(req.query)

  const [properties, total] = await Promise.all([
    Property.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).populate('landlord', 'name email phoneNumber role'),
    Property.countDocuments(filter),
  ])

  return res.json({
    properties,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  })
}

export async function getPropertyById(req: Request, res: Response) {
  const property = await Property.findById(req.params.id).populate('landlord', 'name email phoneNumber role')

  if (!property) {
    return res.status(404).json({ message: 'Property not found' })
  }

  return res.json(property)
}

export async function createProperty(req: Request, res: Response) {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required' })
  }

  const payload = {
    ...req.body,
    landlord: new Types.ObjectId(req.user.id),
    amenities: Array.isArray(req.body?.amenities) ? req.body.amenities : [],
    images: Array.isArray(req.body?.images) ? req.body.images : [],
  }

  const property = await Property.create(payload)
  return res.status(201).json(property)
}

export async function updateProperty(req: Request, res: Response) {
  const property = await Property.findById(req.params.id)

  if (!property) {
    return res.status(404).json({ message: 'Property not found' })
  }

  if (!req.user || property.landlord.toString() !== req.user.id) {
    return res.status(403).json({ message: 'You can only edit your own listings' })
  }

  Object.assign(property, req.body)
  await property.save()

  return res.json(property)
}

export async function deleteProperty(req: Request, res: Response) {
  const property = await Property.findById(req.params.id)

  if (!property) {
    return res.status(404).json({ message: 'Property not found' })
  }

  if (!req.user || property.landlord.toString() !== req.user.id) {
    return res.status(403).json({ message: 'You can only delete your own listings' })
  }

  await property.deleteOne()
  return res.status(204).send()
}