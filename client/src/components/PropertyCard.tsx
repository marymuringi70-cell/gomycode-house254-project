import { BedDouble, Bath, MapPin, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Property } from '../types/property'

interface PropertyCardProps {
  property: Property
}

const money = new Intl.NumberFormat('en-KE', {
  style: 'currency',
  currency: 'KES',
  maximumFractionDigits: 0,
})

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <article className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-[0_20px_60px_rgba(15,81,50,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,81,50,0.14)]">
      <div className="relative h-56">
        <img src={property.images[0]} alt={property.title} className="h-full w-full object-cover" />
        <div className="absolute left-4 top-4 rounded-full bg-brand-emerald px-3 py-1 text-xs font-semibold text-white">
          {property.type === 'rent' ? 'For Rent' : 'For Sale'}
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <h3 className="text-xl font-semibold text-brand-charcoal">{property.title}</h3>
          <p className="mt-1 flex items-center gap-2 text-sm text-brand-charcoal/70">
            <MapPin className="h-4 w-4 text-brand-earth" />
            {property.location}
          </p>
        </div>

        <p className="text-sm leading-6 text-brand-charcoal/75">{property.description}</p>

        <div className="flex flex-wrap gap-3 text-sm text-brand-charcoal/80">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-sage px-3 py-1">
            <BedDouble className="h-4 w-4" />
            {property.bedrooms} bed
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-sage px-3 py-1">
            <Bath className="h-4 w-4" />
            {property.bathrooms} bath
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-brand-sage pt-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-brand-charcoal/60">Price</p>
            <p className="text-lg font-semibold text-brand-emerald">{money.format(property.price)}</p>
          </div>
          <Link
            to={`/property/${property.id}`}
            className="inline-flex items-center gap-2 rounded-full bg-brand-emerald px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-charcoal"
          >
            View details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  )
}