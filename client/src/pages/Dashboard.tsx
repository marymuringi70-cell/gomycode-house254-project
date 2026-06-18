import { Pencil, Trash2, Eye, MessageSquareText } from 'lucide-react'
import { featuredProperties } from '../data/properties'

export default function Dashboard() {
  const activeListings = featuredProperties.length
  const totalViews = featuredProperties.reduce((sum, property) => sum + (property.views ?? 0), 0)
  const inquiryLeads = featuredProperties.reduce((sum, property) => sum + (property.inquiries ?? 0), 0)

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-earth">Dashboard</p>
      <h1 className="mt-2 text-3xl font-bold text-brand-charcoal">Landlord & agent overview</h1>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <article className="rounded-3xl bg-white p-6 shadow-lg">
          <p className="text-sm text-brand-charcoal/70">Active listings</p>
          <p className="mt-2 text-3xl font-bold text-brand-emerald">{activeListings}</p>
        </article>
        <article className="rounded-3xl bg-white p-6 shadow-lg">
          <p className="text-sm text-brand-charcoal/70">Total views</p>
          <p className="mt-2 text-3xl font-bold text-brand-emerald">{totalViews}</p>
        </article>
        <article className="rounded-3xl bg-white p-6 shadow-lg">
          <p className="text-sm text-brand-charcoal/70">Inquiry leads</p>
          <p className="mt-2 text-3xl font-bold text-brand-emerald">{inquiryLeads}</p>
        </article>
      </section>

      <section className="mt-8 overflow-hidden rounded-3xl border border-white/70 bg-white shadow-lg">
        <div className="border-b border-brand-sage px-6 py-4">
          <h2 className="text-lg font-semibold text-brand-charcoal">Active listings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-brand-offwhite text-brand-charcoal/70">
              <tr>
                <th className="px-6 py-4 font-semibold">Title</th>
                <th className="px-6 py-4 font-semibold">Location</th>
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Controls</th>
              </tr>
            </thead>
            <tbody>
              {featuredProperties.map((property) => (
                <tr key={property.id} className="border-t border-brand-sage/60">
                  <td className="px-6 py-4 font-medium text-brand-charcoal">{property.title}</td>
                  <td className="px-6 py-4 text-brand-charcoal/75">{property.location}</td>
                  <td className="px-6 py-4 text-brand-charcoal/75">{property.type}</td>
                  <td className="px-6 py-4 text-brand-charcoal/75">KSh {property.price.toLocaleString('en-KE')}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="inline-flex items-center gap-1 rounded-full bg-brand-sage px-3 py-2 text-xs font-semibold text-brand-emerald">
                        <Pencil className="h-3 w-3" />
                        Edit
                      </button>
                      <button className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">
                        <Trash2 className="h-3 w-3" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center gap-4 border-t border-brand-sage px-6 py-4 text-sm text-brand-charcoal/70">
          <span className="inline-flex items-center gap-2"><Eye className="h-4 w-4" /> Views tracked</span>
          <span className="inline-flex items-center gap-2"><MessageSquareText className="h-4 w-4" /> Leads tracked</span>
        </div>
      </section>
    </main>
  )
}