import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../services/api'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await login(form.email, form.password)
      localStorage.setItem('authToken', data.token)
      localStorage.setItem('authUser', JSON.stringify(data.user))
      navigate('/dashboard')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <div className="rounded-3xl border border-white/70 bg-white/90 p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-brand-charcoal">Login</h1>
        <p className="mt-2 text-brand-charcoal/70">Welcome back. Sign in to manage your listings.</p>

        {error && <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

        <form className="mt-8 grid gap-6" onSubmit={handleSubmit}>
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
              className="rounded-2xl border border-brand-sage bg-brand-offwhite px-4 py-3 outline-none"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-brand-emerald px-6 py-3 font-semibold text-white disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-brand-charcoal/70">
          Don't have an account? <Link to="/register" className="font-semibold text-brand-emerald">Create one</Link>
        </p>
      </div>
    </main>
  )
}
