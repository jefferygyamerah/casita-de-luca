import { Star } from 'lucide-react'
import Section from '../ui/Section'
import Card from '../ui/Card'
import useScrollReveal from '../../hooks/useScrollReveal'

const testimonials = [
  {
    name: 'María G.',
    dog: 'Coco · Pomeranian',
    text: 'Coco siempre regresa feliz y cansado de tanto jugar. Se nota que lo cuidan con mucho amor. Ya es la tercera vez que lo dejamos y nunca nos ha fallado.',
    rating: 5,
  },
  {
    name: 'Carlos R.',
    dog: 'Max · Golden Retriever',
    text: 'El mejor hospedaje que hemos encontrado en Panamá. Las fotos diarias me dan mucha paz cuando viajo. Max llega como en casa desde el primer día.',
    rating: 5,
  },
  {
    name: 'Ana P.',
    dog: 'Luna · French Bulldog',
    text: 'Luna ama ir a La Casita. Desde que la dejé la primera vez supe que había encontrado el lugar perfecto. Cristy y Jona son increíbles con ella.',
    rating: 5,
  },
]

const stars = Array.from({ length: 5 })

function TestimonialCard({ name, dog, text, rating, delay }) {
  const ref = useScrollReveal(delay)
  return (
    <Card
      ref={ref}
      className="bg-warmCream border-borderLight hover:shadow-md transition-all duration-200 ease-out"
    >
      <div className="flex gap-1 mb-4" aria-label={`${rating} estrellas`}>
        {stars.map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-warningAmber text-warningAmber" />
        ))}
      </div>
      <p className="text-bodyText leading-relaxed mb-6 italic">"{text}"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-tealLight rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-lg" aria-hidden="true">🐾</span>
        </div>
        <div>
          <p className="font-bold text-charcoal text-sm" style={{ fontFamily: 'var(--font-heading)' }}>
            {name}
          </p>
          <p className="text-mutedText text-xs">{dog}</p>
        </div>
      </div>
    </Card>
  )
}

export default function Testimonials() {
  const headRef = useScrollReveal()

  return (
    <Section>
      <div ref={headRef} className="text-center mb-14">
        <span className="inline-block text-coral font-semibold text-sm bg-coralLight px-4 py-1.5 rounded-full mb-4">
          Testimonios
        </span>
        <h2
          className="font-extrabold text-charcoal"
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(24px, 3vw, 32px)' }}
        >
          Lo que dicen las familias.
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} {...t} delay={i * 80} />
        ))}
      </div>
    </Section>
  )
}
