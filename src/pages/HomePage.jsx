import { Link } from 'react-router-dom'
import { Heart, Shield, Star, Camera, Calendar, ClipboardList, Sparkles, PawPrint } from 'lucide-react'

const features = [
  {
    icon: Heart,
    title: 'Amor Genuino',
    desc: 'Cada perrito es tratado como familia. Naci\u00f3 de nuestro amor por Luca y por todos los peluditos.',
  },
  {
    icon: Shield,
    title: 'Seguridad Total',
    desc: 'Espacio controlado, c\u00e1maras de monitoreo y supervisi\u00f3n constante para tu tranquilidad.',
  },
  {
    icon: Star,
    title: 'Experiencia VIP',
    desc: 'Juguetes, mimos, paseos y muchas fotos. Tu perrito se va a sentir como en casa.',
  },
  {
    icon: Camera,
    title: 'Fotos Diarias',
    desc: 'Te enviamos fotos y videos todos los d\u00edas para que veas c\u00f3mo se divierte tu beb\u00e9.',
  },
]

const testimonials = [
  {
    name: 'Mar\u00eda G.',
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
    text: 'Luna ama ir a La Casita. Desde que la dej\u00e9 la primera vez, supe que hab\u00eda encontrado el lugar perfecto.',
    rating: 5,
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-tealLight via-white to-coralLight">
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center gap-2 mb-6">
              <PawPrint className="w-5 h-5 text-tealMuted rotate-[-20deg]" />
              <PawPrint className="w-4 h-4 text-coralMuted rotate-[10deg] mt-2" />
              <PawPrint className="w-5 h-5 text-tealMuted rotate-[25deg]" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-charcoal leading-tight mb-6">
              Donde tu perrito es{' '}
              <span className="text-coral">familia</span>
            </h1>
            <p className="text-lg md:text-xl text-bodyText leading-relaxed mb-10 max-w-xl mx-auto">
              Hospedaje VIP para perritos en un hogar lleno de amor, juguetes y alegr\u00eda perruna.
              Fundado en memoria de Luca Toni.
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
              Por qu\u00e9 elegirnos
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal">
              M\u00e1s que un hospedaje, un hogar
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
              Naci\u00f3 del amor por Luca
            </h2>
            <div className="bg-warmCream rounded-2xl p-8 md:p-10 border border-borderLight">
              <p className="text-bodyText leading-relaxed text-lg mb-4">
                Luca Toni llen\u00f3 nuestro hogar de amor por 14 a\u00f1os. Luego de que cruzara el arco\u00edris, nos dimos cuenta que a\u00fan ten\u00edamos mucho amor que dar.
              </p>
              <p className="text-bodyText leading-relaxed text-lg mb-4">
                As\u00ed naci\u00f3 <strong className="text-charcoal">La Casita de Luca</strong>: un hospedaje VIP para cuidar y darle mucho amor a nuestros hu\u00e9spedes mientras sus pap\u00e1s est\u00e1n de viaje.
              </p>
              <p className="text-bodyText leading-relaxed text-lg">
                Los perritos juegan con los 283,746 juguetitos de Luca (no se diga que no era consentido) y a nosotros nos encanta sentir nuestro hogar lleno de alegr\u00eda perruna.
              </p>
              <div className="mt-8 flex items-center justify-center gap-6">
                <div className="text-center">
                  <div className="w-14 h-14 bg-tealLight rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">\ud83d\udc68</span>
                  </div>
                  <span className="font-bold text-charcoal text-sm">Jona</span>
                </div>
                <div className="text-coral text-2xl">&hearts;</div>
                <div className="text-center">
                  <div className="w-14 h-14 bg-coralLight rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">\ud83d\udc69</span>
                  </div>
                  <span className="font-bold text-charcoal text-sm">Cristy</span>
                </div>
                <div className="text-teal text-2xl">&hearts;</div>
                <div className="text-center">
                  <div className="w-14 h-14 bg-warmCream rounded-full flex items-center justify-center mx-auto mb-2 border-2 border-tealMuted">
                    <span className="text-2xl">\ud83d\udc3e</span>
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
              Galer\u00eda
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-charcoal">
              Momentos en La Casita
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { emoji: '\ud83d\udc36', label: 'Jugando en el jard\u00edn', bg: 'from-tealLight to-coralLight' },
              { emoji: '\ud83d\udc3e', label: 'Hora de mimos', bg: 'from-coralLight to-softPeach' },
              { emoji: '\ud83e\udd38', label: 'Sesi\u00f3n de juegos', bg: 'from-tealLight to-tealMuted/30' },
              { emoji: '\ud83d\udecc', label: 'Hora de la siesta', bg: 'from-softPeach to-warmCream' },
              { emoji: '\ud83c\udf3b', label: 'Paseo en el patio', bg: 'from-coralLight to-tealLight' },
              { emoji: '\ud83d\udc95', label: 'Con mucho amor', bg: 'from-tealMuted/30 to-coralLight' },
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
            \ud83d\udcf8 Fotos reales disponibles pronto — \u00a1s\u00edguenos en Instagram!
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
                <p className="text-bodyText leading-relaxed mb-4">\"{t.text}\"</p>
                <div>
                  <span className="font-bold text-charcoal text-sm">{t.name}</span>
                  <span className="text-mutedText text-sm ml-2">\u2014 {t.dog}</span>
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
              \u00bfListo para reservar?
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
