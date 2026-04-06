import { Calendar } from 'lucide-react'
import Button from '../ui/Button'
import useScrollReveal from '../../hooks/useScrollReveal'
import { getPageContent } from '../../data/contentStore'

function InstagramIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )
}

export default function Hero() {
  const textRef = useScrollReveal(0)
  const videoRef = useScrollReveal(100)
  const { heroHeadline, heroSubtext } = getPageContent()

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-tealLight via-white to-coralLight">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-14 md:py-[72px] lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left — text */}
          <div ref={textRef} className="flex-1 text-center lg:text-left">
            <img
              src="/logo.jpg"
              alt="La Casita de Luca"
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-xl shadow-teal/20 mx-auto lg:mx-0 mb-8"
            />

            <h1
              className="font-extrabold text-charcoal mb-6"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(32px, 5vw, 56px)',
                lineHeight: 1.1,
              }}
            >
              {heroHeadline}
            </h1>

            <p
              className="text-bodyText mb-10 max-w-xl mx-auto lg:mx-0"
              style={{ fontSize: 'clamp(16px, 1.5vw, 18px)', lineHeight: 1.5 }}
            >
              {heroSubtext}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button to="/reservar" size="large">
                <Calendar className="w-5 h-5" />
                Reservar estadía
              </Button>
              <Button
                href="https://www.instagram.com/la_casita_de_luca/"
                variant="secondary"
                size="large"
              >
                <InstagramIcon className="w-4 h-4" />
                Ver día a día
              </Button>
            </div>
          </div>

          {/* Right — hero video */}
          <div ref={videoRef} className="w-full lg:w-auto lg:flex-shrink-0 flex justify-center">
            <div
              className="rounded-3xl overflow-hidden shadow-2xl shadow-teal/15"
              style={{ width: 288, height: 512 }}
            >
              <iframe
                allow="fullscreen;autoplay"
                allowFullScreen
                src="https://streamable.com/e/cngsnj?autoplay=1&muted=1"
                width="288"
                height="512"
                style={{ border: 'none', display: 'block' }}
                title="La Casita de Luca — Un día con nosotros"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 1440 64" fill="none" className="w-full block">
          <path d="M0,32 C360,64 1080,0 1440,32 L1440,64 L0,64 Z" fill="#FFFAF6" />
        </svg>
      </div>
    </section>
  )
}
