import { Heart, MapPin, Camera } from 'lucide-react'
import Section from '../ui/Section'
import Card from '../ui/Card'
import useScrollReveal from '../../hooks/useScrollReveal'

const values = [
  {
    icon: Heart,
    title: 'Amor y atención 24/7',
    desc: 'Tu perrito nunca está solo. Jona y Cristy los cuidan con la misma dedicación que le dieron a Luca por 14 años.',
  },
  {
    icon: MapPin,
    title: 'Juego, paseos y socialización',
    desc: 'Cada día está lleno de actividades pensadas para que tu perrito sea feliz, activo y bien socializado.',
  },
  {
    icon: Camera,
    title: 'Comunicación constante',
    desc: 'Fotos y videos todos los días para que puedas ver cómo está tu bebé, aunque estés al otro lado del mundo.',
  },
]

function ValueCard({ icon: Icon, title, desc, delay }) {
  const ref = useScrollReveal(delay)
  return (
    <Card className="hover:shadow-md hover:border-tealMuted transition-all duration-200 ease-out" ref={ref}>
      <div className="w-12 h-12 bg-tealLight rounded-2xl flex items-center justify-center mb-6">
        <Icon className="w-6 h-6 text-tealDark" />
      </div>
      <h3 className="font-bold text-lg text-charcoal mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
        {title}
      </h3>
      <p className="text-bodyText leading-relaxed">{desc}</p>
    </Card>
  )
}

export default function WhyCasita() {
  const headRef = useScrollReveal()

  return (
    <Section>
      <div ref={headRef} className="text-center mb-14">
        <span className="inline-block text-tealDark font-semibold text-sm bg-tealLight px-4 py-1.5 rounded-full mb-4">
          Por qué La Casita
        </span>
        <h2
          className="font-extrabold text-charcoal"
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(24px, 3vw, 32px)' }}
        >
          Más que un hospedaje,{' '}
          <span className="text-tealDark">un hogar de verdad.</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {values.map((v, i) => (
          <ValueCard key={i} {...v} delay={i * 80} />
        ))}
      </div>
    </Section>
  )
}
