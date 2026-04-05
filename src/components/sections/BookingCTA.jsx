import { useState } from 'react'
import { Send, MessageCircle } from 'lucide-react'
import Section from '../ui/Section'
import Button from '../ui/Button'
import useScrollReveal from '../../hooks/useScrollReveal'

export default function BookingCTA() {
  const [form, setForm] = useState({ name: '', dog: '', message: '' })
  const [sent, setSent] = useState(false)

  const headRef = useScrollReveal()
  const formRef = useScrollReveal(80)

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const text = `Hola! Soy ${form.name}, tengo un perrito llamado ${form.dog}. ${form.message}`
    window.open(`https://wa.me/50766746941?text=${encodeURIComponent(text)}`, '_blank')
    setSent(true)
    setForm({ name: '', dog: '', message: '' })
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <Section id="contacto">
      <div className="max-w-2xl mx-auto text-center">
        <div ref={headRef}>
          <span className="inline-block text-tealDark font-semibold text-sm bg-tealLight px-4 py-1.5 rounded-full mb-4">
            Reserva o consulta
          </span>
          <h2
            className="font-extrabold text-charcoal mb-4"
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(24px, 3vw, 32px)' }}
          >
            Hablemos. Respondemos rápido.
          </h2>
          <p className="text-bodyText mb-10" style={{ lineHeight: 1.5 }}>
            Escríbenos con el nombre tuyo y de tu perrito y te respondemos en minutos.
          </p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="text-left space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-1.5" htmlFor="bc-name">
                Tu nombre
              </label>
              <input
                id="bc-name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="María"
                className="w-full h-12 px-4 rounded-2xl border border-border bg-white text-charcoal placeholder:text-mutedText focus:outline-none focus:border-tealMuted focus:ring-2 focus:ring-teal/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-1.5" htmlFor="bc-dog">
                Nombre de tu perrito
              </label>
              <input
                id="bc-dog"
                name="dog"
                type="text"
                required
                value={form.dog}
                onChange={handleChange}
                placeholder="Coco"
                className="w-full h-12 px-4 rounded-2xl border border-border bg-white text-charcoal placeholder:text-mutedText focus:outline-none focus:border-tealMuted focus:ring-2 focus:ring-teal/10 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-charcoal mb-1.5" htmlFor="bc-message">
              ¿En qué te podemos ayudar?
            </label>
            <textarea
              id="bc-message"
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              placeholder="Quisiera reservar para las fechas..."
              className="w-full px-4 py-3 rounded-2xl border border-border bg-white text-charcoal placeholder:text-mutedText focus:outline-none focus:border-tealMuted focus:ring-2 focus:ring-teal/10 transition-all resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button type="submit" size="large" className="flex-1 justify-center">
              <Send className="w-4 h-4" />
              {sent ? '¡Mensaje enviado!' : 'Enviar por WhatsApp'}
            </Button>
            <Button
              href="https://www.instagram.com/la_casita_de_luca/"
              variant="secondary"
              size="large"
            >
              <MessageCircle className="w-4 h-4" />
              DM en Instagram
            </Button>
          </div>
        </form>
      </div>
    </Section>
  )
}
