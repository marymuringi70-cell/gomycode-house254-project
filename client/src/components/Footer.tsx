import { Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/60 bg-brand-offwhite/80">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <h2 className="text-lg font-semibold text-brand-emerald">House254</h2>
          <p className="mt-3 max-w-sm text-sm leading-6 text-brand-charcoal/80">
            Kenyan property discovery with a polished search experience for homes, land, and commercial spaces.
          </p>
        </div>

        <div className="space-y-3 text-sm text-brand-charcoal/80">
          <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-brand-earth" /> Nairobi Office, Westlands</p>
          <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-brand-earth" /> Coast Office, Nyali, Mombasa</p>
          <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-brand-earth" /> Rift Office, Eldoret CBD</p>
        </div>

        <div className="space-y-3 text-sm text-brand-charcoal/80">
          <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-brand-earth" /> +254 700 000 254</p>
          <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-brand-earth" /> hello@house254.co.ke</p>
          <p>Terms, privacy, and listing standards apply.</p>
        </div>
      </div>
    </footer>
  )
}