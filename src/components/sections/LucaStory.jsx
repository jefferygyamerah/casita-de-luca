import { Heart } from 'lucide-react'
import Section from '../ui/Section'
import useScrollReveal from '../../hooks/useScrollReveal'
import { getLucaPhoto } from '../../data/contentStore'

export default function LucaStory() {
  const leftRef = useScrollReveal(0)
  const rightRef = useScrollReveal(100)
  const lucaPhoto = getLucaPhoto()

  return (
    <Section bg="bg-white">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Visual — Luca placeholder */}
        <div ref={leftRef} className="order-2 lg:order-1">
          <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-tealLight via-warmCream to-coralLight aspect-square max-w-md mx-auto flex items-center justify-center shadow-xl shadow-teal/10">
            {lucaPhoto ? (
              <img src={lucaPhoto} alt="Luca Toni" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center">
                <div className="text-8xl mb-4" aria-hidden="true">🐾</div>
                <p
                  className="font-extrabold text-charcoal text-2xl"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Luca Toni
                </p>
                <p className="text-mutedText text-sm mt-1">14 años de alegría perruna</p>
              </div>
            )}
          </div>
        </div>

        {/* Text */}
        <div ref={rightRef} className="order-1 lg:order-2">
          <span className="inline-flex items-center gap-1.5 text-coral font-semibold text-sm bg-coralLight px-4 py-1.5 rounded-full mb-6">
            <Heart className="w-4 h-4" />
            Conoce a Luca
          </span>

          <h2
            className="font-extrabold text-charcoal mb-6"
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(24px, 3vw, 32px)' }}
          >
            Todo comenzó con él.
          </h2>

          <div className="space-y-4">
            <p className="text-bodyText leading-relaxed" style={{ fontSize: 'clamp(16px, 1.2vw, 18px)' }}>
              Luca Toni llenó nuestro hogar de amor durante 14 años. Cuando cruzó el arcoíris, nos dimos cuenta de que todavía teníamos mucho amor por dar.
            </p>
            <p className="text-bodyText leading-relaxed" style={{ fontSize: 'clamp(16px, 1.2vw, 18px)' }}>
              Así nació <strong className="text-charcoal">La Casita de Luca</strong>: un hospedaje VIP donde cada perrito es tratado como él lo fue — con mimo, estructura y mucho, mucho amor.
            </p>
            <p className="text-bodyText leading-relaxed" style={{ fontSize: 'clamp(16px, 1.2vw, 18px)' }}>
              Los perritos juegan con los 283,746 juguetes de Luca (no se diga que no era consentido) y nosotros amamos sentir el hogar lleno de alegría perruna otra vez.
            </p>
          </div>

          <div className="flex items-center gap-5 mt-8 pt-8 border-t border-borderLight">
            <div className="text-center">
              <div className="w-12 h-12 bg-tealLight rounded-full flex items-center justify-center mx-auto mb-1.5">
                <span className="text-xl" aria-hidden="true">👨</span>
              </div>
              <span className="font-bold text-charcoal text-sm" style={{ fontFamily: 'var(--font-heading)' }}>Jona</span>
            </div>
            <span className="text-coral text-xl" aria-hidden="true">♥</span>
            <div className="text-center">
              <div className="w-12 h-12 bg-coralLight rounded-full flex items-center justify-center mx-auto mb-1.5">
                <span className="text-xl" aria-hidden="true">👩</span>
              </div>
              <span className="font-bold text-charcoal text-sm" style={{ fontFamily: 'var(--font-heading)' }}>Cristy</span>
            </div>
            <span className="text-teal text-xl" aria-hidden="true">♥</span>
            <div className="text-center">
              <div className="w-12 h-12 bg-warmCream border-2 border-tealMuted rounded-full flex items-center justify-center mx-auto mb-1.5">
                <span className="text-xl" aria-hidden="true">🐾</span>
              </div>
              <span className="font-bold text-charcoal text-sm" style={{ fontFamily: 'var(--font-heading)' }}>Luca</span>
            </div>
          </div>
        </div>

      </div>
    </Section>
  )
}
