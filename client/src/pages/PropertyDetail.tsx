import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PhoneCall, MessageCircle, CheckCircle2 } from 'lucide-react'
import { featuredProperties } from '../data/properties'

const money = new Intl.NumberFormat('en-KE', {
  style: 'currency',
  currency: 'KES',
  maximumFractionDigits: 0,
})

export default function PropertyDetail() {
  const { id } = useParams()

  const property = useMemo(
    () => featuredProperties.find((item) => item.id === id) ?? featuredProperties[0],
    [id],
  )

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link to="/browse" className="text-sm font-semibold text-brand-emerald">Back to browse</Link>

      <section className="mt-4 grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-earth">Property detail</p>
            <h1 className="mt-2 text-3xl font-bold text-brand-charcoal">{property.title}</h1>
            <p className="mt-2 text-brand-charcoal/70">{property.address}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {property.images.map((image, index) => (
              <img key={image} src={image} alt={`${property.title} ${index + 1}`} className="h-60 w-full rounded-3xl object-cover shadow-lg first:sm:col-span-3 first:h-96" />
            ))}
          </div>

          <div className="rounded-3xl border border-white/70 bg-white p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-brand-charcoal">Overview</h2>
            <p className="mt-3 leading-7 text-brand-charcoal/75">{property.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {property.amenities.map((amenity) => (
                <span key={amenity} className="inline-flex items-center gap-2 rounded-full bg-brand-sage px-4 py-2 text-sm font-medium text-brand-emerald">
                  <CheckCircle2 className="h-4 w-4" />
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-3xl border border-brand-sage bg-brand-emerald p-6 text-white shadow-2xl lg:sticky lg:top-24">
          <p className="text-sm uppercase tracking-[0.25em] text-brand-sage/90">Call to action</p>
          <p className="mt-4 text-3xl font-bold">{money.format(property.price)}</p>
          <p className="mt-2 text-sm text-white/80">
            {property.bedrooms} bedrooms • {property.bathrooms} bathrooms
          </p>

          <div className="mt-6 grid gap-3">
            <a href="tel:+254700000254" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3 font-semibold text-brand-emerald">
              <PhoneCall className="h-4 w-4" />
              Call agent
            </a>
            <a href="https://wa.me/254700000254" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-4 py-3 font-semibold text-white">
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>

          <div className="mt-6 rounded-2xl bg-white/10 p-4 text-sm leading-6 text-white/90">
            Physical address, amenities, and contact options are surfaced here for quick conversion.
          </div>
        </aside>
      </section>
    </main>
  )
}