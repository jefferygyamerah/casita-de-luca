import { ExternalLink } from 'lucide-react'

function InstagramIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )
}
import { InstagramEmbed } from 'react-social-media-embed'
import Section from '../ui/Section'
import instagramPosts from '../../data/instagramPosts.json'
import useScrollReveal from '../../hooks/useScrollReveal'

const INSTAGRAM_URL = 'https://www.instagram.com/la_casita_de_luca/'

export default function InstagramFeed() {
  const headRef = useScrollReveal()
  const gridRef = useScrollReveal(80)

  return (
    <Section bg="bg-white">
      <div ref={headRef} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div>
          <span className="inline-block text-tealDark font-semibold text-sm bg-tealLight px-4 py-1.5 rounded-full mb-4">
            Instagram
          </span>
          <h2
            className="font-extrabold text-charcoal"
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(24px, 3vw, 32px)' }}
          >
            El día a día en La Casita.
          </h2>
        </div>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-tealDark hover:text-teal transition-colors no-underline flex-shrink-0"
        >
          <InstagramIcon className="w-4 h-4" />
          @la_casita_de_luca
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {instagramPosts.length > 0 ? (
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {instagramPosts.map(({ url }) => (
            <div key={url} className="w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
              <InstagramEmbed url={url} width="100%" />
            </div>
          ))}
        </div>
      ) : (
        <div ref={gridRef}>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group block no-underline"
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] p-px">
              <div className="rounded-3xl bg-white p-10 md:p-14 text-center group-hover:bg-warmCream transition-colors">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <img
                      src="/logo.jpg"
                      alt="La Casita de Luca en Instagram"
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl"
                    />
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] flex items-center justify-center">
                      <InstagramIcon className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                <p className="text-lg font-bold text-charcoal mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  @la_casita_de_luca
                </p>
                <p className="text-mutedText mb-6">
                  Fotos y videos de nuestros huéspedes peludos todos los días
                </p>
                <span className="inline-flex items-center gap-2 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-bold py-3 px-8 rounded-full text-sm group-hover:opacity-90 transition-opacity">
                  <InstagramIcon className="w-4 h-4" />
                  Seguir en Instagram
                </span>
              </div>
            </div>
          </a>
        </div>
      )}
    </Section>
  )
}
