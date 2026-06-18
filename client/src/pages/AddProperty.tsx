import { useState } from 'react'
import { UploadCloud } from 'lucide-react'

const categories = ['apartment', 'house', 'land', 'commercial'] as const

export default function AddProperty() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'apartment',
    price: '',
    location: '',
  })

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-earth">Property form</p>
      <h1 className="mt-2 text-3xl font-bold text-brand-charcoal">Add or edit a listing</h1>

      <form className="mt-8 grid gap-6 rounded-3xl border border-white/70 bg-white p-6 shadow-lg">
        <div className="grid gap-6 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-brand-charcoal/70">
            Title
            <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="rounded-2xl border border-brand-sage px-4 py-3 outline-none" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-brand-charcoal/70">
            Category
            <select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} className="rounded-2xl border border-brand-sage px-4 py-3 outline-none">
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium text-brand-charcoal/70 md:col-span-2">
            Description
            <textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} rows={5} className="rounded-2xl border border-brand-sage px-4 py-3 outline-none" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-brand-charcoal/70">
            Pricing (KSh)
            <input value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} className="rounded-2xl border border-brand-sage px-4 py-3 outline-none" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-brand-charcoal/70">
            Location
            <input value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} className="rounded-2xl border border-brand-sage px-4 py-3 outline-none" />
          </label>
        </div>

        <div className="rounded-3xl border-2 border-dashed border-brand-sage bg-brand-offwhite p-8 text-center text-brand-charcoal/70">
          <UploadCloud className="mx-auto h-10 w-10 text-brand-emerald" />
          <p className="mt-4 text-lg font-semibold text-brand-charcoal">Drag and drop images here</p>
          <p className="mt-1 text-sm">Mock upload zone for property media.</p>
        </div>

        <div className="flex justify-end">
          <button type="button" className="rounded-full bg-brand-emerald px-6 py-3 font-semibold text-white">
            Save listing
          </button>
        </div>
      </form>
    </main>
  )
}