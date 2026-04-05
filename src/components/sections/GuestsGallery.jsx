import Section from '../ui/Section'
import useScrollReveal from '../../hooks/useScrollReveal'

// Google Drive direct image URLs (folder: 1YhSEsXPpL4aTittqa1vq3ZG0sINmxJCl)
const guests = [
  {
    name: 'Donna',
    image: 'https://lh3.googleusercontent.com/d/1wdvdO0uSnD6G_N47NkVYh3_BUDCd8s59',
    personality: 'Dulce, cariñosa y siempre lista para un abrazo.',
    bg: 'from-tealLight to-tealMuted',
  },
  {
    name: 'Jck',
    image: 'https://lh3.googleusercontent.com/d/1Ln3xR0Vw5Umn8vreSxXzstyOwXeK61Gj',
    personality: 'Energía infinita y el mejor amigo de todos.',
    bg: 'from-softPeach to-coralLight',
  },
  {
    name: 'Luffy',
    image: 'https://lh3.googleusercontent.com/d/1WkOACOMTdQqV3fZIBknaLU6CODK480I7',
    personality: 'Aventurero nato, explorador de corazón.',
    bg: 'from-coralLight to-coralMuted',
  },
  {
    name: 'Milo',
    image: 'https://lh3.googleusercontent.com/d/1XUxUduh0qLOLmWHXsIhSVMbCHOdXcGID',
    personality: 'Tranquilo, noble y muy consentido.',
    bg: 'from-tealLight to-tealMuted',
  },
  {
    name: 'Oscar Itto',
    image: 'https://lh3.googleusercontent.com/d/1Bt2qKKFLDJas7I1c4VbpbN5uhLM6vEFD',
    personality: 'Pequeño de tamaño, enorme de personalidad.',
    bg: 'from-softPeach to-coralLight',
  },
  {
    name: 'Ozzy',
    image: 'https://lh3.googleusercontent.com/d/1zIB3aRZ6pY4RkxZOiyiYiW7-YUzDRjji',
    personality: 'El más juguetón de La Casita, siempre.',
    bg: 'from-tealMuted to-tealLight',
  },
  {
    name: 'Wdy',
    image: 'https://lh3.googleusercontent.com/d/1a3MF9dhXfqpy_vSJZI2D2P2ADLGvM-mV',
    personality: 'Curioso, inteligente y muy buen compañero.',
    bg: 'from-coralLight to-coralMuted',
  },
]

function GuestCard({ name, image, personality, bg, delay }) {
  const ref = useScrollReveal(delay)
  return (
    <div
      ref={ref}
      className="rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-200 ease-out hover:-translate-y-1"
    >
      {/* Photo — gradient shows as fallback if image fails to load */}
      <div className={`bg-gradient-to-br ${bg} h-40 relative overflow-hidden`}>
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
      </div>

      <div className="bg-white px-5 py-4">
        <p className="font-bold text-charcoal" style={{ fontFamily: 'var(--font-heading)' }}>
          {name}
        </p>
        <p className="text-sm text-bodyText leading-snug mt-1">{personality}</p>
      </div>
    </div>
  )
}

export default function GuestsGallery() {
  const headRef = useScrollReveal()

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

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
        {guests.map((g, i) => (
          <GuestCard key={i} {...g} delay={i * 60} />
        ))}
      </div>
    </Section>
  )
}
