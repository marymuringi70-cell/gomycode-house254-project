import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../services/api'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'seeker',
    phoneNumber: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await register({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        phoneNumber: form.phoneNumber || undefined,
      })
      localStorage.setItem('authToken', data.token)
      localStorage.setItem('authUser', JSON.stringify(data.user))
      navigate('/dashboard')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <div className="rounded-3xl border border-white/70 bg-white/90 p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-brand-charcoal">Register</h1>
        <p className="mt-2 text-brand-charcoal/70">Create an account to start listing or finding properties.</p>

        {error && <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

        <form className="mt-8 grid gap-6" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm font-medium text-brand-charcoal/70">
            Full name
            <input
              type="text"
              required
              className="rounded-2xl border border-brand-sage bg-brand-offwhite px-4 py-3 outline-none"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-brand-charcoal/70">
            Email
            <input
              type="email"
              required
              className="rounded-2xl border border-brand-sage bg-brand-offwhite px-4 py-3 outline-none"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-brand-charcoal/70">
            Password
            <input
              type="password"
              required
              minLength={6}
              className="rounded-2xl border border-brand-sage bg-brand-offwhite px-4 py-3 outline-none"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-brand-charcoal/70">
            Phone number
            <input
              type="tel"
              className="rounded-2xl border border-brand-sage bg-brand-offwhite px-4 py-3 outline-none"
              value={form.phoneNumber}
              onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-brand-charcoal/70">
            I want to
            <select
              className="rounded-2xl border border-brand-sage bg-brand-offwhite px-4 py-3 outline-none"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="seeker">Find a property</option>
              <option value="landlord">List a property</option>
            </select>
          </label>
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-brand-emerald px-6 py-3 font-semibold text-white disabled:opacity-60"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-brand-charcoal/70">
          Already have an account? <Link to="/login" className="font-semibold text-brand-emerald">Sign in</Link>
        </p>
      </div>
    </main>
  )
}
