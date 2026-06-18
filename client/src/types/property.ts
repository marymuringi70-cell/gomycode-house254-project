export type PropertyType = 'rent' | 'sale'
export type PropertyCategory = 'apartment' | 'house' | 'land' | 'commercial'

export interface Property {
  id: string
  title: string
  description: string
  type: PropertyType
  propertyCategory: PropertyCategory
  price: number
  location: string
  address: string
  bedrooms: number
  bathrooms: number
  images: string[]
  amenities: string[]
  featured?: boolean
  views?: number
  inquiries?: number
  landlord?: string
}

export interface PropertyFilters {
  location: string
  category: string
  maxPrice: string
  type: string
}