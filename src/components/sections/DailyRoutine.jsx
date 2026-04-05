import { Sun, Zap, Coffee, Wind, Moon } from 'lucide-react'
import Section from '../ui/Section'
import useScrollReveal from '../../hooks/useScrollReveal'

const routine = [
  {
    icon: Sun,
    time: 'Mañana',
    title: 'Salida y desayuno',
    desc: 'Empezamos el día con energía. Salida matutina al jardín y desayuno a la hora correcta según la dieta de cada perrito.',
    color: 'bg-softPeach',
    iconColor: 'text-warningAmber',
  },
  {
    icon: Zap,
    time: 'Media mañana',
    title: 'Juego y socialización',
    desc: 'Tiempo libre para jugar, correr y hacer nuevos amigos. Los juguetes de Luca siguen siendo los favoritos.',
    color: 'bg-tealLight',
    iconColor: 'text-tealDark',
  },
  {
    icon: Coffee,
    time: 'Mediodía',
    title: 'Descanso y mimos',
    desc: 'Siesta, caricias y mucha calma. Cada perrito descansa en su espacio tranquilo y seguro.',
    color: 'bg-coralLight',
    iconColor: 'text-coral',
  },
  {
    icon: Wind,
    time: 'Tarde',
    title: 'Paseos',
    desc: 'Salida en grupo para explorar, oler el mundo y gastar esa energía acumulada de la tarde.',
    color: 'bg-tealLight',
    iconColor: 'text-tealDark',
  },
  {
    icon: Moon,
    time: 'Noche',
    title: 'Cena y descanso seguro',
    desc: 'Cena puntual, último paseo nocturno y a dormir tranquilos. Supervisión constante durante toda la noche.',
    color: 'bg-softPeach',
    iconColor: 'text-warningAmber',
  },
]

function TimelineItem({ icon: Icon, time, title, desc, color, iconColor, delay, isLast }) {
  const ref = useScrollReveal(delay)
  return (
    <div ref={ref} className="flex gap-5 md:gap-8">
      {/* Timeline spine */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center shadow-sm`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        {!isLast && <div className="w-px flex-1 bg-border mt-3" />}
      </div>

      {/* Content */}
      <div className={`pb-10 ${isLast ? '' : ''}`}>
        <span className="text-xs font-semibold text-mutedText uppercase tracking-wider">{time}</span>
        <h3
          className="font-bold text-charcoal text-lg mt-0.5 mb-2"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {title}
        </h3>
        <p className="text-bodyText leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

export default function DailyRoutine() {
  const headRef = useScrollReveal()

  return (
    <Section>
      <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
        <div ref={headRef}>
          <span className="inline-block text-tealDark font-semibold text-sm bg-tealLight px-4 py-1.5 rounded-full mb-4">
            Un día con nosotros
          </span>
          <h2
            className="font-extrabold text-charcoal mb-4"
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(24px, 3vw, 32px)' }}
          >
            Estructura, amor y mucho juego.
          </h2>
          <p className="text-bodyText leading-relaxed" style={{ fontSize: 'clamp(16px, 1.2vw, 18px)' }}>
            Cada día en La Casita tiene un ritmo pensado para el bienestar físico y emocional de tu perrito. Constancia, cariño y diversión en la dosis exacta.
          </p>
        </div>

        <div>
          {routine.map((item, i) => (
            <TimelineItem
              key={i}
              {...item}
              delay={i * 80}
              isLast={i === routine.length - 1}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}
