import Section from '../ui/Section'
import useScrollReveal from '../../hooks/useScrollReveal'
import { getHuespedcitos } from '../../data/contentStore'

const PLACEHOLDERS = [
  { name: 'Coco', breed: 'Pomeranian', personality: 'El rey de los mimos y los rulos.', bg: 'from-tealLight to-tealMuted' },
  { name: 'Max', breed: 'Golden Retriever', personality: 'Siempre listo para jugar con todos.', bg: 'from-softPeach to-coralLight' },
  { name: 'Luna', breed: 'French Bulldog', personality: 'Pequeña pero con carácter enorme.', bg: 'from-coralLight to-coralMuted' },
  { name: 'Bruno', breed: 'Labrador', personality: 'El más feliz del grupo, siempre.', bg: 'from-tealLight to-tealMuted' },
  { name: 'Mia', breed: 'Shih Tzu', personality: 'Princesa oficial de La Casita.', bg: 'from-softPeach to-coralLight' },
  { name: 'Rocky', breed: 'Beagle', personality: 'Nariz detective, corazón de oro.', bg: 'from-tealMuted to-tealLight' },
]

function PlaceholderCard({ name, breed, personality, bg, delay }) {
  const ref = useScrollReveal(delay)
  return (
    <div
      ref={ref}
      className="rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-200 ease-out hover:-translate-y-1"
    >
      <div className={`bg-gradient-to-br ${bg} h-40 flex items-center justify-center`}>
        <span className="text-6xl" aria-hidden="true">🐾</span>
      </div>
      <div className="bg-white px-5 py-4">
        <p className="font-bold text-charcoal" style={{ fontFamily: 'var(--font-heading)' }}>{name}</p>
        <p className="text-xs text-mutedText font-medium mb-1">{breed}</p>
        <p className="text-sm text-bodyText leading-snug">{personality}</p>
      </div>
    </div>
  )
}

function PhotoCard({ dog, delay }) {
  const ref = useScrollReveal(delay)
  return (
    <div
      ref={ref}
      className="rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-200 ease-out hover:-translate-y-1"
    >
      <div className="h-40 overflow-hidden">
        <img
          src={dog.photoUrl}
          alt={dog.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="bg-white px-5 py-4">
        <p className="font-bold text-charcoal" style={{ fontFamily: 'var(--font-heading)' }}>{dog.name}</p>
        {dog.breed && <p className="text-xs text-mutedText font-medium">{dog.breed}</p>}
      </div>
    </div>
  )
}

export default function GuestsGallery() {
  const headRef = useScrollReveal()
  const huespedcitos = getHuespedcitos()
  const guests = huespedcitos.length > 0 ? huespedcitos : null

  return (
    <Section bg="bg-white">
      <div ref={headRef} className="text-center mb-14">
        <span className="inline-block text-coral font-semibold text-sm bg-coralLight px-4 py-1.5 rounded-full mb-4">
          Huéspedcitos
        </span>
        <h2
          className="font-extrabold text-charcoal"
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(24px, 3vw, 32px)' }}
        >
          Conoce a nuestros peluditos.
        </h2>
        <p className="text-bodyText mt-3 max-w-lg mx-auto" style={{ lineHeight: 1.5 }}>
          Cada uno llega como huésped y se va como parte de la familia.
        </p>
      </div>

      {guests ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
          {guests.map((dog, i) => (
            <PhotoCard key={dog.id} dog={dog} delay={i * 60} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
          {PLACEHOLDERS.map((g, i) => (
            <PlaceholderCard key={i} {...g} delay={i * 60} />
          ))}
        </div>
      )}
    </Section>
  )
}
