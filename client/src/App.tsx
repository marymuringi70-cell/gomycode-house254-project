
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Browse from './pages/Browse'
import PropertyDetail from './pages/PropertyDetail'
import Dashboard from './pages/Dashboard'
import AddProperty from './pages/AddProperty'

function AuthPlaceholder({ title }: { title: string }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-brand-charcoal">{title}</h1>
      <p className="mt-3 text-brand-charcoal/70">Authentication flows will connect to the backend phase.</p>
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-property" element={<AddProperty />} />
          <Route path="/login" element={<AuthPlaceholder title="Login" />} />
          <Route path="/register" element={<AuthPlaceholder title="Register" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}