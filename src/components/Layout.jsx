import { Outlet, Link, useLocation } from 'react-router-dom'
import { Dog, Calendar, ClipboardList, Settings, Menu, X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

const navLinks = [
  { to: '/', label: 'Inicio', icon: Dog },
  { to: '/reservar', label: 'Reservar', icon: Calendar },
  { to: '/registro', label: 'Registro', icon: ClipboardList },
  { to: '/admin', label: 'Admin', icon: Settings },
]

export default function Layout() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) return
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-border sticky top-0 z-50" ref={menuRef}>
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 no-underline">
            <div className="w-10 h-10 bg-tealLight rounded-full flex items-center justify-center">
              <Dog className="w-6 h-6 text-teal" />
            </div>
            <div>
              <span className="font-heading font-bold text-lg text-charcoal leading-tight block">
                La Casita de Luca
              </span>
              <span className="text-xs text-mutedText font-medium">
                Cuidamos a tu perrito como si fuera nuestro Luca
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label, icon: Icon }) => {
              const active = location.pathname === to
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all no-underline ${
                    active
                      ? 'bg-tealLight text-tealDark'
                      : 'text-mutedText hover:bg-bgGray hover:text-charcoal'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              )
            })}
          </nav>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-bgGray transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            {menuOpen ? <X className="w-6 h-6 text-charcoal" /> : <Menu className="w-6 h-6 text-charcoal" />}
          </button>
        </div>

        {menuOpen && (
          <nav id="mobile-nav" className="md:hidden border-t border-border bg-white px-4 pb-4 pt-2">
            {navLinks.map(({ to, label, icon: Icon }) => {
              const active = location.pathname === to
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all no-underline ${
                    active
                      ? 'bg-tealLight text-tealDark'
                      : 'text-mutedText hover:bg-bgGray hover:text-charcoal'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </Link>
              )
            })}
          </nav>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-charcoal text-white/70 py-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Dog className="w-5 h-5 text-teal" />
            <span className="font-heading font-bold text-white text-lg">
              La Casita de Luca
            </span>
          </div>
          <p className="text-sm mb-1">
            Con amor, Jona & Cristy
          </p>
          <p className="text-sm">
            En memoria de Luca Toni \u2665 14 a\u00f1os de alegr\u00eda perruna
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-4">
            <a href="https://wa.me/50766746941" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-teal transition-colors text-sm">
              WhatsApp: +507 6674-6941
            </a>
            <a href="https://instagram.com/la_casita_de_luca" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-teal transition-colors text-sm">
              @la_casita_de_luca
            </a>
          </div>
          <div className="mt-4 text-xs text-white/40">
            \u00a9 {new Date().getFullYear()} La Casita de Luca. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
