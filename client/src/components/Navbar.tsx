import { Link, NavLink } from 'react-router-dom'
import { Building2, Menu, LogOut, LayoutDashboard, UserPlus, LogIn } from 'lucide-react'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-4 py-2 text-sm font-medium transition ${isActive ? 'bg-brand-sage text-brand-emerald' : 'text-brand-offwhite/90 hover:bg-white/10 hover:text-white'}`

export default function Navbar() {
  const isAuthenticated = Boolean(localStorage.getItem('authToken'))

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-emerald/95 text-brand-offwhite backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 font-semibold tracking-tight">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15">
            <Building2 className="h-5 w-5" />
          </span>
          <span>
            House254
            <span className="block text-xs font-normal text-brand-sage/90">Kenyan property market</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/browse" className={navLinkClass}>
            Browse
          </NavLink>
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/add-property" className={navLinkClass}>
            Add Property
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold hover:bg-white/10"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem('authToken')
                  window.location.reload()
                }}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-emerald transition hover:bg-brand-sage"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold hover:bg-white/10"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-emerald transition hover:bg-brand-sage"
              >
                <UserPlus className="h-4 w-4" />
                Register
              </Link>
            </>
          )}
          <button type="button" className="rounded-full p-2 md:hidden" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  )
}