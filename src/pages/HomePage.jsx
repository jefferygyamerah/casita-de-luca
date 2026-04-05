import { Link } from 'react-router-dom'
import { Heart, Shield, Star, Camera, Calendar, ClipboardList, Sparkles, PawPrint } from 'lucide-react'

const features = [
  {
    icon: Heart,
    title: 'Amor Genuino',
    desc: 'Cada perrito es tratado como familia. Nació de nuestro amor por Luca y por todos los peluditos.',
  },
  {
    icon: Shield,
    title: 'Seguridad Total',
    desc: 'Espacio controlado, cámaras de monitoreo y supervisión constante para tu tranquilidad.',
  },
  {
    icon: Star,
    title: 'Experiencia VIP',
    desc: 'Juguetes, mimos, paseos y muchas fotos. Tu perrito se va a sentir como en casa.',
  },
  {
    icon: Camera,
    title: 'Fotos Diarias',
    desc: 'Te enviamos fotos y videos todos los días para que veas cómo se divierte tu bebé.',
  },
]

const testimonials = [
  {
    name: 'María G.',
    dog: 'Coco, Pomeranian',
    text: 'Coco siempre regresa feliz y cansado de tanto jugar. Se nota que lo cuidan con mucho amor.',
    rating: 5,
  },
  {
    name: 'Carlos R.',
    dog: 'Max, Golden Retriever',
    text: 'El mejor hospedaje que hemos encontrado. Las fotos diarias me dan mucha paz cuando viajo.',
    rating: 5,
  },
  {
    name: 'Ana P.',
    dog: 'Luna, French Bulldog',
    text: 'Luna ama ir a La Casita. Desde que la dejé la primera vez, supe que había encontrado el lugar perfecto.',
    rating: 5,
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-tealLight via-white to-coralLight">
        {/* Scattered paw prints background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <PawPrint className="absolute top-10 left-8 w-8 h-8 text-teal/10 rotate-[-30deg]" />
          <PawPrint className="absolute top-24 right-16 w-6 h-6 text-coral/10 rotate-[20deg]" />
          <PawPrint className="absolute top-40 left-1/4 w-5 h-5 text-teal/10 rotate-[15deg]" />
          <PawPrint className="absolute bottom-20 left-16 w-7 h-7 text-coral/10 rotate-[-10deg]" />
          <PawPrint className="absolute bottom-32 right-24 w-5 h-5 text-teal/10 rotate-[35deg]" />
          <PawPrint className="absolute top-16 right-1/3 w-4 h-4 text-coral/10 rotate-[-15deg]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-32">
          <div className="max-w-2xl mx-auto text-center">
            {/* Logo mark */}
            <div className="flex justify-center mb-6">
              <img
                src="/logo.jpg"
                alt="La Casita de Luca"
                className="w-24 h-24 rounded-full object-cover shadow-xl shadow-teal/25 border-4 border-white ring-2 ring-tealMuted"
              />
            </div>

            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-tealMuted/40 text-tealDark font-semibold text-sm px-4 py-1.5 rounded-full mb-6 shadow-sm">
              <span className="w-2 h-2 bg-teal rounded-full" style={{ animation: 'pulse 2s infinite' }} />
              Hospedaje VIP · Panamá
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-charcoal leading-tight mb-6">
              Donde tu perrito es{' '}
              <span className="text-coral">familia</span>
            </h1>
            <p className="text-lg md:text-xl text-bodyText leading-relaxed mb-10 max-w-xl mx-auto">
              Hospedaje en hogar para perritos en Panamá — amor genuino, fotos diarias
              y el legado de Luca Toni.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/reservar"
                className="inline-flex items-center justify-center gap-2 bg-teal hover:bg-tealDark text-white font-bold py-3.5 px-8 rounded-xl text-lg transition-all shadow-lg shadow-teal/25 hover:shadow-xl hover:shadow-tealDark/30 no-underline"
              >
                <Calendar className="w-5 h-5" />
                Reservar Ahora
              </Link>
              <Link
                to="/registro"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-bgGray text-charcoal font-bold py-3.5 px-8 rounded-xl text-lg border-2 border-border hover:border-tealMuted transition-all no-underline"
              >
                <ClipboardList className="w-5 h-5" />
                Registrar Perrito
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-10 text-sm text-mutedText font-medium">
              <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-warningAmber fill-warningAmber" /> 5.0 en reseñas</span>
              <span className="flex items-center gap-1.5"><Camera className="w-4 h-4 text-teal" /> Fotos diarias</span>
              <span className="flex items-center gap-1.5"><Heart className="w-4 h-4 text-coral" /> Hogar familiar</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#FFFAF6" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 text-tealDark font-semibold text-sm bg-tealLight px-3 py-1 rounded-full mb-4">
              <Sparkles className="w-4 h-4" />
              Por qué elegirnos
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal">
              Más que un hospedaje, un hogar
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-border hover:border-tealMuted hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 bg-tealLight rounded-xl flex items-center justify-center mb-4 group-hover:bg-teal transition-colors">
                  <f.icon className="w-6 h-6 text-tealDark group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-lg text-charcoal mb-2">{f.title}</h3>
                <p className="text-sm text-mutedText leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Story Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 text-coral font-semibold text-sm bg-coralLight px-3 py-1 rounded-full mb-4">
              <Heart className="w-4 h-4" />
              Nuestra Historia
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal mb-6">
              Nació del amor por Luca
            </h2>
            <div className="bg-warmCream rounded-2xl p-8 md:p-10 border border-borderLight">
              <p className="text-bodyText leading-relaxed text-lg mb-4">
                Luca Toni llenó nuestro hogar de amor por 14 años. Luego de que cruzara el arcoíris, nos dimos cuenta que aún teníamos mucho amor que dar.
              </p>
              <p className="text-bodyText leading-relaxed text-lg mb-4">
                Así nació <strong className="text-charcoal">La Casita de Luca</strong>: un hospedaje VIP para cuidar y darle mucho amor a nuestros huéspedes mientras sus papás están de viaje.
              </p>
              <p className="text-bodyText leading-relaxed text-lg">
                Los perritos juegan con los 283,746 juguetitos de Luca (no se diga que no era consentido) y a nosotros nos encanta sentir nuestro hogar lleno de alegría perruna.
              </p>
              <div className="mt-8 flex items-center justify-center gap-6">
                <div className="text-center">
                  <div className="w-14 h-14 bg-tealLight rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">👨</span>
                  </div>
                  <span className="font-bold text-charcoal text-sm">Jona</span>
                </div>
                <div className="text-coral text-2xl">&hearts;</div>
                <div className="text-center">
                  <div className="w-14 h-14 bg-coralLight rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">👩</span>
                  </div>
                  <span className="font-bold text-charcoal text-sm">Cristy</span>
                </div>
                <div className="text-teal text-2xl">&hearts;</div>
                <div className="text-center">
                  <div className="w-14 h-14 bg-warmCream rounded-full flex items-center justify-center mx-auto mb-2 border-2 border-tealMuted">
                    <span className="text-2xl">🐾</span>
                  </div>
                  <span className="font-bold text-charcoal text-sm">Luca</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Placeholder */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 text-tealDark font-semibold text-sm bg-tealLight px-3 py-1 rounded-full mb-4">
              <Camera className="w-4 h-4" />
              Galería
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal">
              Momentos en La Casita
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { emoji: '🐶', label: 'Jugando en el jardín', bg: 'from-tealLight to-coralLight' },
              { emoji: '🐾', label: 'Hora de mimos', bg: 'from-coralLight to-softPeach' },
              { emoji: '🤸', label: 'Sesión de juegos', bg: 'from-tealLight to-tealMuted/30' },
              { emoji: '🛌', label: 'Hora de la siesta', bg: 'from-softPeach to-warmCream' },
              { emoji: '🌻', label: 'Paseo en el patio', bg: 'from-coralLight to-tealLight' },
              { emoji: '💕', label: 'Con mucho amor', bg: 'from-tealMuted/30 to-coralLight' },
            ].map((item, i) => (
              <div
                key={i}
                className={`aspect-square bg-gradient-to-br ${item.bg} rounded-2xl flex items-center justify-center border border-border hover:shadow-lg transition-all group cursor-pointer`}
              >
                <div className="text-center px-4">
                  <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform">{item.emoji}</span>
                  <span className="text-xs text-mutedText font-semibold leading-tight block">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-mutedText text-sm mt-6">
            📸 Fotos reales disponibles pronto — ¡síguenos en Instagram!
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 text-coral font-semibold text-sm bg-coralLight px-3 py-1 rounded-full mb-4">
              <Star className="w-4 h-4" />
              Testimonios
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal">
              Lo que dicen nuestros clientes
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-warmCream rounded-2xl p-6 border border-borderLight">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-warningAmber text-warningAmber" />
                  ))}
                </div>
                <p className="text-bodyText leading-relaxed mb-4">"{t.text}"</p>
                <div>
                  <span className="font-bold text-charcoal text-sm">{t.name}</span>
                  <span className="text-mutedText text-sm ml-2">— {t.dog}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-br from-teal to-tealDark rounded-3xl p-10 md:p-14 text-white">
            <PawPrint className="w-10 h-10 text-white/30 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              ¿Listo para reservar?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-md mx-auto">
              Dale a tu perrito unas vacaciones VIP llenas de amor, juegos y mimos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/reservar"
                className="inline-flex items-center justify-center gap-2 bg-white text-tealDark font-bold py-3.5 px-8 rounded-xl text-lg hover:bg-warmCream transition-all no-underline"
              >
                <Calendar className="w-5 h-5" />
                Reservar Ahora
              </Link>
              <Link
                to="/registro"
                className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white font-bold py-3.5 px-8 rounded-xl text-lg border-2 border-white/30 transition-all no-underline"
              >
                <ClipboardList className="w-5 h-5" />
                Primer Registro
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
