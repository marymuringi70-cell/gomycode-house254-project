import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import PropertyCard from '../components/PropertyCard'
import { categories, featuredProperties, listingTypes, locations } from '../data/properties'

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-brand-sage px-4 py-2 text-sm font-semibold text-brand-emerald">
            Kenyan real estate, refined
          </span>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight text-brand-charcoal sm:text-5xl lg:text-6xl">
            Find homes, land, and commercial spaces across Kenya.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-brand-charcoal/75">
            Search curated listings in Nairobi, Kiambu, Machakos, and Mombasa with a fast, polished discovery flow.
          </p>

          <div className="grid gap-3 rounded-3xl border border-white/70 bg-white/85 p-4 shadow-lg sm:grid-cols-4">
            <label className="grid gap-2 text-sm font-medium text-brand-charcoal/70">
              Location
              <select className="rounded-2xl border border-brand-sage bg-brand-offwhite px-4 py-3 text-brand-charcoal outline-none">
                {locations.map((location) => (
                  <option key={location}>{location}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-medium text-brand-charcoal/70">
              Price Cap
              <input className="rounded-2xl border border-brand-sage bg-brand-offwhite px-4 py-3 outline-none" placeholder="KSh 100,000" />
            </label>
            <label className="grid gap-2 text-sm font-medium text-brand-charcoal/70">
              Category
              <select className="rounded-2xl border border-brand-sage bg-brand-offwhite px-4 py-3 text-brand-charcoal outline-none">
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-medium text-brand-charcoal/70">
              Type
              <select className="rounded-2xl border border-brand-sage bg-brand-offwhite px-4 py-3 text-brand-charcoal outline-none">
                {listingTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to="/browse" className="inline-flex items-center gap-2 rounded-full bg-brand-emerald px-6 py-3 font-semibold text-white">
              <Search className="h-4 w-4" />
              Search listings
            </Link>
            <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-full border border-brand-emerald px-6 py-3 font-semibold text-brand-emerald">
              View dashboard
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {featuredProperties.slice(0, 2).map((property) => (
            <div key={property.id} className="rounded-3xl border border-white/70 bg-white p-4 shadow-lg">
              <img src={property.images[0]} alt={property.title} className="h-40 w-full rounded-2xl object-cover" />
              <div className="mt-4">
                <p className="text-sm font-semibold text-brand-emerald">{property.location}</p>
                <h2 className="mt-1 text-lg font-semibold text-brand-charcoal">{property.title}</h2>
                <p className="mt-2 text-sm text-brand-charcoal/70">{property.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-earth">Featured</p>
            <h2 className="mt-2 text-2xl font-bold text-brand-charcoal">Featured properties</h2>
          </div>
          <Link to="/browse" className="text-sm font-semibold text-brand-emerald">See all listings</Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>
    </main>
  )
}