import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ShieldCheck, Mail, Lock, User, Phone, BadgeInfo } from 'lucide-react'
import { login, register, type AuthUser } from '../services/api'

type AuthMode = 'login' | 'register'

interface AuthFormProps {
  mode: AuthMode
}

const roleOptions: Array<{ value: AuthUser['role']; label: string }> = [
  { value: 'seeker', label: 'Seeker' },
  { value: 'landlord', label: 'Landlord' },
]

export default function AuthForm({ mode }: AuthFormProps) {
  const navigate = useNavigate()
  const isLoggedIn = Boolean(localStorage.getItem('authToken'))

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    role: 'seeker' as AuthUser['role'],
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />
  }

  const isRegister = mode === 'register'

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (isRegister && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      setIsSubmitting(true)

      const response = isRegister
        ? await register({
            name: formData.name.trim(),
            email: formData.email.trim(),
            password: formData.password,
            role: formData.role,
            phoneNumber: formData.phoneNumber.trim() || undefined,
          })
        : await login({
            email: formData.email.trim(),
            password: formData.password,
          })

      localStorage.setItem('authToken', response.token)
      localStorage.setItem('authUser', JSON.stringify(response.user))
      navigate('/dashboard', { replace: true })
    } catch (submitError) {
      if (submitError instanceof Error) {
        setError(submitError.message)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-gradient-to-b from-brand-emerald/15 to-transparent" />
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <section className="rounded-[2rem] border border-white/70 bg-white p-8 shadow-2xl shadow-brand-emerald/10 sm:p-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-sage px-4 py-2 text-sm font-semibold text-brand-emerald">
            <ShieldCheck className="h-4 w-4" />
            Secure access
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-brand-charcoal">
            {isRegister ? 'Create your House254 account' : 'Welcome back to House254'}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-brand-charcoal/70">
            {isRegister
              ? 'Register to save listings, manage properties, and publish your own inventory.'
              : 'Sign in to continue managing listings and exploring the property marketplace.'}
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            {isRegister && (
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-brand-charcoal">Full name</span>
                <div className="relative">
                  <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-charcoal/35" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(event) => updateField('name', event.target.value)}
                    className="w-full rounded-2xl border border-brand-sage bg-brand-offwhite px-11 py-3.5 text-brand-charcoal outline-none transition placeholder:text-brand-charcoal/35 focus:border-brand-emerald focus:bg-white"
                    placeholder="Jane Doe"
                    required={isRegister}
                  />
                </div>
              </label>
            )}

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-brand-charcoal">Email address</span>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-charcoal/35" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  className="w-full rounded-2xl border border-brand-sage bg-brand-offwhite px-11 py-3.5 text-brand-charcoal outline-none transition placeholder:text-brand-charcoal/35 focus:border-brand-emerald focus:bg-white"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-brand-charcoal">Password</span>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-charcoal/35" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(event) => updateField('password', event.target.value)}
                  className="w-full rounded-2xl border border-brand-sage bg-brand-offwhite px-11 py-3.5 text-brand-charcoal outline-none transition placeholder:text-brand-charcoal/35 focus:border-brand-emerald focus:bg-white"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </label>

            {isRegister && (
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-brand-charcoal">Confirm password</span>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-charcoal/35" />
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(event) => updateField('confirmPassword', event.target.value)}
                    className="w-full rounded-2xl border border-brand-sage bg-brand-offwhite px-11 py-3.5 text-brand-charcoal outline-none transition placeholder:text-brand-charcoal/35 focus:border-brand-emerald focus:bg-white"
                    placeholder="Repeat your password"
                    required={isRegister}
                  />
                </div>
              </label>
            )}

            {isRegister && (
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-brand-charcoal">Account type</span>
                  <div className="relative">
                    <BadgeInfo className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-charcoal/35" />
                    <select
                      value={formData.role}
                      onChange={(event) => updateField('role', event.target.value)}
                      className="w-full rounded-2xl border border-brand-sage bg-brand-offwhite px-11 py-3.5 text-brand-charcoal outline-none transition focus:border-brand-emerald focus:bg-white"
                    >
                      {roleOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-brand-charcoal">Phone number</span>
                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-charcoal/35" />
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(event) => updateField('phoneNumber', event.target.value)}
                      className="w-full rounded-2xl border border-brand-sage bg-brand-offwhite px-11 py-3.5 text-brand-charcoal outline-none transition placeholder:text-brand-charcoal/35 focus:border-brand-emerald focus:bg-white"
                      placeholder="+254 7xx xxx xxx"
                    />
                  </div>
                </label>
              </div>
            )}

            {error && <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-brand-emerald px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-emerald/90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Please wait...' : isRegister ? 'Create account' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-brand-charcoal/70">
            {isRegister ? 'Already have an account?' : 'Need an account?'}{' '}
            <Link to={isRegister ? '/login' : '/register'} className="font-semibold text-brand-emerald hover:underline">
              {isRegister ? 'Log in' : 'Register'}
            </Link>
          </p>
        </section>

        <aside className="rounded-[2rem] border border-brand-sage/80 bg-brand-emerald p-8 text-brand-offwhite shadow-2xl shadow-brand-emerald/20 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-sage/90">House254</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight">
            {isRegister ? 'Start listing and saving homes today.' : 'Pick up where you left off.'}
          </h2>
          <p className="mt-4 text-brand-sage/95">
            {isRegister
              ? 'Your account keeps your property workflow in one place: browse, shortlist, and publish listings.'
              : 'Use your account to continue viewing your saved properties and dashboard data.'}
          </p>

          <div className="mt-8 space-y-4">
            <div className="rounded-3xl bg-white/10 p-5">
              <p className="text-sm text-brand-sage/90">Fast onboarding</p>
              <p className="mt-2 text-lg font-semibold">Secure JWT login with persistent token storage.</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-5">
              <p className="text-sm text-brand-sage/90">Built for landlords</p>
              <p className="mt-2 text-lg font-semibold">Choose seeker or landlord roles during registration.</p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}