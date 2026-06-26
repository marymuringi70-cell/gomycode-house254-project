import type { Request, Response } from 'express'
import { Property } from '../models/Property.js'

export async function getProperties(_req: Request, res: Response) {
  const properties = await Property.find()
  res.json(properties)
}

export async function getPropertyById(req: Request, res: Response) {
  const property = await Property.findById(req.params.id)
  if (!property) {
    return res.status(404).json({ message: 'Property not found' })
  }
  res.json(property)
}

export async function createProperty(req: Request, res: Response) {
  const property = await Property.create(req.body)
  res.status(201).json(property)
}

export async function updateProperty(req: Request, res: Response) {
  const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!property) {
    return res.status(404).json({ message: 'Property not found' })
  }
  res.json(property)
}

export async function deleteProperty(req: Request, res: Response) {
  const property = await Property.findByIdAndDelete(req.params.id)
  if (!property) {
    return res.status(404).json({ message: 'Property not found' })
  }
  res.json({ message: 'Property deleted' })
}