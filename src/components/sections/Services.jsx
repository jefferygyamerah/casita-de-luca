import { Moon, Sun, Sparkles, Check } from 'lucide-react'
import Section from '../ui/Section'
import Card from '../ui/Card'
import Button from '../ui/Button'
import useScrollReveal from '../../hooks/useScrollReveal'

const services = [
  {
    icon: Moon,
    label: 'Más popular',
    labelColor: 'bg-tealLight text-tealDark',
    title: 'Hospedaje nocturno',
    desc: 'Tu perrito se queda a dormir en un ambiente familiar, seguro y lleno de amor.',
    features: [
      'Supervisión durante toda la noche',
      'Espacio cómodo y tranquilo',
      'Desayuno incluido al día siguiente',
      'Fotos de llegada y salida',
    ],
  },
  {
    icon: Sun,
    label: 'Guardería de día',
    labelColor: 'bg-softPeach text-warningAmber',
    title: 'Guardería de día',
    desc: 'Para cuando tienes un día ocupado y quieres que tu perrito lo pase de maravilla.',
    features: [
      'De lunes a sábado',
      'Juego, socialización y paseos',
      'Snacks incluidos',
      'Fotos durante el día',
    ],
  },
  {
    icon: Sparkles,
    label: 'A medida',
    labelColor: 'bg-coralLight text-coral',
    title: 'Servicios especiales',
    desc: 'Atención personalizada para necesidades específicas de tu perrito.',
    features: [
      'Medicamentos y cuidados especiales',
      'Dieta personalizada',
      'Atención para perros mayores',
      'Coordinación con veterinario',
    ],
  },
]

function ServiceCard({ icon: Icon, label, labelColor, title, desc, features, delay }) {
  const ref = useScrollReveal(delay)
  return (
    <Card
      ref={ref}
      className="flex flex-col hover:shadow-md hover:border-tealMuted transition-all duration-200 ease-out"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 bg-tealLight rounded-2xl flex items-center justify-center">
          <Icon className="w-6 h-6 text-tealDark" />
        </div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${labelColor}`}>{label}</span>
      </div>

      <h3 className="font-bold text-xl text-charcoal mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
        {title}
      </h3>
      <p className="text-bodyText leading-relaxed mb-6">{desc}</p>

      <ul className="space-y-2 mb-8 flex-1">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-bodyText">
            <Check className="w-4 h-4 text-successGreen mt-0.5 flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      <Button to="/reservar" variant="secondary" className="w-full justify-center">
        Consultar disponibilidad
      </Button>
    </Card>
  )
}

export default function Services() {
  const headRef = useScrollReveal()

  return (
    <Section bg="bg-white">
      <div ref={headRef} className="text-center mb-14">
        <span className="inline-block text-tealDark font-semibold text-sm bg-tealLight px-4 py-1.5 rounded-full mb-4">
          Servicios
        </span>
        <h2
          className="font-extrabold text-charcoal"
          style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(24px, 3vw, 32px)' }}
        >
          Todo lo que tu perrito necesita.
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <ServiceCard key={i} {...s} delay={i * 80} />
        ))}
      </div>
    </Section>
  )
}
