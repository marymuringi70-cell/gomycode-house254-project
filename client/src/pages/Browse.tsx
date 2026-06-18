import { useState } from 'react'
import PropertyCard from '../components/PropertyCard'
import { categories, featuredProperties, listingTypes, locations } from '../data/properties'

export default function Browse() {
  const [filtersOpen, setFiltersOpen] = useState(true)

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-earth">Browse</p>
          <h1 className="mt-2 text-3xl font-bold text-brand-charcoal">Search all listings</h1>
        </div>
        <button
          type="button"
          onClick={() => setFiltersOpen((value) => !value)}
          className="rounded-full border border-brand-emerald px-4 py-2 text-sm font-semibold text-brand-emerald"
        >
          {filtersOpen ? 'Hide filters' : 'Show filters'}
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        {filtersOpen && (
          <aside className="h-fit rounded-3xl border border-white/70 bg-white p-5 shadow-lg">
            <h2 className="text-lg font-semibold text-brand-charcoal">Filter panel</h2>
            <div className="mt-4 grid gap-4">
              <label className="grid gap-2 text-sm font-medium text-brand-charcoal/70">
                Location
                <select className="rounded-2xl border border-brand-sage bg-brand-offwhite px-4 py-3 outline-none">
                  {locations.map((location) => (
                    <option key={location}>{location}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-medium text-brand-charcoal/70">
                Property category
                <select className="rounded-2xl border border-brand-sage bg-brand-offwhite px-4 py-3 outline-none">
                  {categories.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-medium text-brand-charcoal/70">
                Listing type
                <select className="rounded-2xl border border-brand-sage bg-brand-offwhite px-4 py-3 outline-none">
                  {listingTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-medium text-brand-charcoal/70">
                Max price
                <input className="rounded-2xl border border-brand-sage bg-brand-offwhite px-4 py-3 outline-none" placeholder="KSh 200,000" />
              </label>
            </div>
          </aside>
        )}

        <section>
          <div className="mb-4 flex items-center justify-between text-sm text-brand-charcoal/70">
            <span>{featuredProperties.length} results</span>
            <span>Paginated listing feed</span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="mt-8 flex justify-center gap-3">
            <button className="rounded-full border border-brand-emerald px-5 py-2 text-sm font-semibold text-brand-emerald">Previous</button>
            <button className="rounded-full bg-brand-emerald px-5 py-2 text-sm font-semibold text-white">Next</button>
          </div>
        </section>
      </div>
    </main>
  )
}