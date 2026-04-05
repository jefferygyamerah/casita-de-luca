import { Outlet, Link, useLocation } from 'react-router-dom'
import { Calendar, ClipboardList, Settings, Menu, X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

const navLinks = [
  { to: '/', label: 'Inicio' },
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

      {/* ─── Header ─── */}
      <header
        ref={menuRef}
        className="bg-white/90 backdrop-blur-md border-b border-border sticky top-0 z-50"
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 no-underline group">
            <img
              src="/logo.jpg"
              alt="La Casita de Luca"
              className="w-9 h-9 rounded-full object-cover shadow-sm shadow-teal/25 group-hover:opacity-90 transition-opacity"
            />
            <div>
              <span className="font-heading font-extrabold text-base text-charcoal leading-tight block">
                La Casita <span className="text-coral">de Luca</span>
              </span>
              <span className="text-[11px] text-mutedText font-medium leading-none">
                Hospedaje para perritos · Panamá
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">
            {navLinks.map(({ to, label, icon: Icon }) => {
              const active = location.pathname === to
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 no-underline ${
                    active
                      ? 'bg-tealLight text-tealDark'
                      : 'text-mutedText hover:bg-bgGray hover:text-charcoal'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {label}
                </Link>
              )
            })}
          </nav>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-bgGray transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            {menuOpen
              ? <X className="w-5 h-5 text-charcoal" />
              : <Menu className="w-5 h-5 text-charcoal" />
            }
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav
            id="mobile-nav"
            className="md:hidden border-t border-border bg-white px-6 pb-4 pt-2"
            aria-label="Navegación móvil"
          >
            {navLinks.map(({ to, label, icon: Icon }) => {
              const active = location.pathname === to
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all no-underline ${
                    active
                      ? 'bg-tealLight text-tealDark'
                      : 'text-mutedText hover:bg-bgGray hover:text-charcoal'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {label}
                </Link>
              )
            })}
          </nav>
        )}
      </header>

      {/* ─── Main ─── */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ─── Footer ─── */}
      <footer className="bg-charcoal text-white/70">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-12">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">

            {/* Brand */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <img src="/logo.jpg" alt="La Casita de Luca" className="w-8 h-8 rounded-full object-cover" />
                <span className="font-heading font-extrabold text-white text-base">
                  La Casita <span className="text-coral">de Luca</span>
                </span>
              </div>
              <p className="text-sm mb-1">Con amor, Jona & Cristy</p>
              <p className="text-sm text-white/50">En memoria de Luca Toni ♥ 14 años de alegría perruna</p>
            </div>

            {/* Contact */}
            <div className="flex flex-col items-center md:items-end gap-2">
              <a
                href="https://wa.me/50766746941"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-teal transition-colors text-sm no-underline"
              >
                WhatsApp: +507 6674-6941
              </a>
              <a
                href="https://instagram.com/la_casita_de_luca"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-teal transition-colors text-sm no-underline"
              >
                @la_casita_de_luca
              </a>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 text-center text-xs text-white/30">
            © {new Date().getFullYear()} La Casita de Luca. Todos los derechos reservados.
          </div>
        </div>
      </footer>

    </div>
  )
}
