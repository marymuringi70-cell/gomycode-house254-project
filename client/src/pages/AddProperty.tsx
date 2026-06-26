import { useState, useRef } from 'react'
import { UploadCloud } from 'lucide-react'
import { createProperty } from '../services/api'
import { getStoredToken, isTokenValid } from '../utils/auth'

const categories = ['apartment', 'house', 'land', 'commercial'] as const
const propertyTypes = ['rent', 'sale'] as const

export default function AddProperty() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    type: 'rent',
    propertyCategory: 'apartment',
    price: '',
    location: '',
    address: '',
    amenities: '',
  })
  const [images, setImages] = useState<FileList | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      if (!isTokenValid(getStoredToken())) {
        throw new Error('You must be logged in as a landlord to create a listing.')
      }

      const data = new FormData()
      data.append('title', form.title)
      data.append('description', form.description)
      data.append('type', form.type)
      data.append('propertyCategory', form.propertyCategory)
      data.append('price', form.price)
      data.append('location', form.location)
      data.append('address', form.address)
      data.append('amenities', JSON.stringify(form.amenities.split(',').map((item) => item.trim()).filter(Boolean)))

      if (images) {
        Array.from(images).forEach((file) => {
          data.append('images', file)
        })
      }

      await createProperty(data)
      alert('Listing saved successfully!')
      setForm({
        title: '',
        description: '',
        type: 'rent',
        propertyCategory: 'apartment',
        price: '',
        location: '',
        address: '',
        amenities: '',
      })
      setImages(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save listing.'
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImages(event.target.files)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setImages(event.dataTransfer.files)
      event.dataTransfer.clearData()
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-earth">Property form</p>
      <h1 className="mt-2 text-3xl font-bold text-brand-charcoal">Add or edit a listing</h1>

      <form className="mt-8 grid gap-6 rounded-3xl border border-white/70 bg-white p-6 shadow-lg" onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-brand-charcoal/70">
            Title
            <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="rounded-2xl border border-brand-sage px-4 py-3 outline-none" required />
          </label>
          <label className="grid gap-2 text-sm font-medium text-brand-charcoal/70">
            Type
            <select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })} className="rounded-2xl border border-brand-sage px-4 py-3 outline-none">
              {propertyTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium text-brand-charcoal/70">
            Category
            <select value={form.propertyCategory} onChange={(event) => setForm({ ...form, propertyCategory: event.target.value })} className="rounded-2xl border border-brand-sage px-4 py-3 outline-none">
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium text-brand-charcoal/70">
            Pricing (KSh)
            <input type="number" min="0" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} className="rounded-2xl border border-brand-sage px-4 py-3 outline-none" required />
          </label>
          <label className="grid gap-2 text-sm font-medium text-brand-charcoal/70 md:col-span-2">
            Location
            <input value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} className="rounded-2xl border border-brand-sage px-4 py-3 outline-none" required />
          </label>
          <label className="grid gap-2 text-sm font-medium text-brand-charcoal/70 md:col-span-2">
            Address
            <input value={form.address} onChange={(event) => setForm({ ...form, address: event.target.value })} className="rounded-2xl border border-brand-sage px-4 py-3 outline-none" required />
          </label>
          <label className="grid gap-2 text-sm font-medium text-brand-charcoal/70 md:col-span-2">
            Description
            <textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} rows={5} className="rounded-2xl border border-brand-sage px-4 py-3 outline-none" required />
          </label>
          <label className="grid gap-2 text-sm font-medium text-brand-charcoal/70 md:col-span-2">
            Amenities (comma separated)
            <input value={form.amenities} onChange={(event) => setForm({ ...form, amenities: event.target.value })} placeholder="e.g. WiFi, Parking, Pool" className="rounded-2xl border border-brand-sage px-4 py-3 outline-none" />
          </label>
        </div>

        <div
          className="rounded-3xl border-2 border-dashed border-brand-sage bg-brand-offwhite p-8 text-center text-brand-charcoal/70"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />
          <UploadCloud className="mx-auto h-10 w-10 text-brand-emerald" />
          <p className="mt-4 text-lg font-semibold text-brand-charcoal">Drag and drop images here</p>
          <p className="mt-1 text-sm">or</p>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-2 rounded-full border border-brand-emerald px-4 py-2 text-sm font-semibold text-brand-emerald hover:bg-brand-emerald hover:text-white"
          >
            Browse files
          </button>
          {images && images.length > 0 && (
            <p className="mt-3 text-sm font-medium text-brand-charcoal">{images.length} file(s) selected</p>
          )}
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex justify-end">
          <button type="submit" disabled={submitting} className="rounded-full bg-brand-emerald px-6 py-3 font-semibold text-white disabled:opacity-60">
            {submitting ? 'Saving...' : 'Save listing'}
          </button>
        </div>
      </form>
    </main>
  )
}