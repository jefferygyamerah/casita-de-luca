import { useState, useMemo } from 'react'
import { format, addDays, startOfWeek, addWeeks, isSameDay, isBefore, startOfToday } from 'date-fns'
import { es } from 'date-fns/locale'
import { ChevronLeft, ChevronRight, Dog, Check, AlertCircle, Calendar } from 'lucide-react'
import { getAvailability, addBooking, getCapacity } from '../data/bookingStore'

const SIZE_LABELS = {
  small: { label: 'Peque\u00f1o', desc: '< 10 kg', emoji: '\ud83d\udc36' },
  medium: { label: 'Mediano', desc: '10\u201325 kg', emoji: '\ud83d\udc15' },
  large: { label: 'Grande', desc: '> 25 kg', emoji: '\ud83e\uddae' },
}

function AvailabilityBadge({ available, total }) {
  if (available === 0) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-errorRed bg-coralLight px-2 py-0.5 rounded-full">
        Lleno
      </span>
    )
  }
  const ratio = available / total
  const color = ratio > 0.5 ? 'text-successGreen bg-tealLight' : 'text-warningAmber bg-softPeach'
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${color}`}>
      {available} disponible{available !== 1 ? 's' : ''}
    </span>
  )
}

export default function BookingPage() {
  const today = startOfToday()
  const [weekStart, setWeekStart] = useState(startOfWeek(today, { weekStartsOn: 1 }))
  const [selectedDate, setSelectedDate] = useState(today)
  const [selectedSize, setSelectedSize] = useState(null)
  const [form, setForm] = useState({ ownerName: '', dogName: '', phone: '', notes: '' })
  const [result, setResult] = useState(null)

  const days = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart]
  )

  const dateStr = format(selectedDate, 'yyyy-MM-dd')
  const availability = getAvailability(dateStr)
  const capacity = getCapacity()

  function handleSubmit(e) {
    e.preventDefault()
    if (!selectedSize) return
    const res = addBooking(dateStr, {
      size: selectedSize,
      ownerName: form.ownerName,
      dogName: form.dogName,
      phone: form.phone,
      notes: form.notes,
    })
    setResult(res)
    if (res.success) {
      setForm({ ownerName: '', dogName: '', phone: '', notes: '' })
      setSelectedSize(null)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-1.5 text-tealDark font-semibold text-sm bg-tealLight px-3 py-1 rounded-full mb-4">
          <Calendar className="w-4 h-4" />
          Reservas
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-charcoal mb-2">
          Reservar Hospedaje
        </h1>
        <p className="text-mutedText">Selecciona una fecha y el tama\u00f1o de tu perrito</p>
      </div>

      <div className="bg-white rounded-2xl border border-border p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setWeekStart(addWeeks(weekStart, -1))}
            disabled={!isBefore(startOfWeek(today, { weekStartsOn: 1 }), weekStart)}
            className="p-2 rounded-lg hover:bg-bgGray transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Semana anterior"
          >
            <ChevronLeft className="w-5 h-5 text-charcoal" />
          </button>
          <span className="font-bold text-charcoal capitalize">
            {format(weekStart, 'MMMM yyyy', { locale: es })}
          </span>
          <button
            onClick={() => setWeekStart(addWeeks(weekStart, 1))}
            className="p-2 rounded-lg hover:bg-bgGray transition-colors"
            aria-label="Semana siguiente"
          >
            <ChevronRight className="w-5 h-5 text-charcoal" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => {
            const dayStr = format(day, 'yyyy-MM-dd')
            const avail = getAvailability(dayStr)
            const isSelected = isSameDay(day, selectedDate)
            const isPast = isBefore(day, today)
            return (
              <button
                key={dayStr}
                disabled={isPast}
                onClick={() => { setSelectedDate(day); setResult(null) }}
                className={`flex flex-col items-center py-3 px-1 rounded-xl transition-all text-center ${
                  isPast
                    ? 'opacity-40 cursor-not-allowed'
                    : isSelected
                    ? 'bg-teal text-white shadow-lg shadow-teal/25'
                    : 'hover:bg-tealLight'
                }`}
              >
                <span className={`text-xs font-semibold uppercase mb-1 ${isSelected ? 'text-white/70' : 'text-mutedText'}`}>
                  {format(day, 'EEE', { locale: es })}
                </span>
                <span className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-charcoal'}`}>
                  {format(day, 'd')}
                </span>
                {!isPast && (
                  <div className={`mt-1 w-2 h-2 rounded-full ${avail.total > 0 ? 'bg-successGreen' : 'bg-errorRed'}`} />
                )}
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {Object.entries(SIZE_LABELS).map(([key, { label, desc, emoji }]) => {
          const avail = availability[key]
          const cap = capacity[key]
          const isSelected = selectedSize === key
          const isFull = avail === 0
          return (
            <button
              key={key}
              disabled={isFull}
              onClick={() => { setSelectedSize(key); setResult(null) }}
              className={`relative p-5 rounded-2xl border-2 transition-all text-left ${
                isFull
                  ? 'border-border bg-bgGray opacity-60 cursor-not-allowed'
                  : isSelected
                  ? 'border-teal bg-tealLight shadow-lg shadow-teal/15'
                  : 'border-border bg-white hover:border-tealMuted hover:shadow-md'
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-teal rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
              <span className="text-2xl mb-2 block">{emoji}</span>
              <span className="font-bold text-charcoal block">{label}</span>
              <span className="text-xs text-mutedText block mb-3">{desc}</span>
              <AvailabilityBadge available={avail} total={cap} />
              <div className="mt-3 h-2 bg-bgGray rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    avail === 0 ? 'bg-errorRed' : avail / cap > 0.5 ? 'bg-successGreen' : 'bg-warningAmber'
                  }`}
                  style={{ width: `${((cap - avail) / cap) * 100}%` }}
                />
              </div>
              <span className="text-xs text-mutedText mt-1 block">
                {cap - avail}/{cap} ocupados
              </span>
            </button>
          )
        })}
      </div>

      {selectedSize && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-border p-6 md:p-8">
          <h3 className="font-bold text-xl text-charcoal mb-6 flex items-center gap-2">
            <Dog className="w-5 h-5 text-teal" />
            Datos de la reserva \u2014 {format(selectedDate, "d 'de' MMMM", { locale: es })}
          </h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-1.5">Nombre del due\u00f1o</label>
              <input
                required
                autoComplete="name"
                value={form.ownerName}
                onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-warmCream focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-1.5">Nombre del perrito</label>
              <input
                required
                autoComplete="off"
                value={form.dogName}
                onChange={(e) => setForm({ ...form, dogName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-warmCream focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
                placeholder="Nombre de tu perrito"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-charcoal mb-1.5">Tel\u00e9fono / WhatsApp</label>
            <input
              required
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-border bg-warmCream focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
              placeholder="+507 6000-0000"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-charcoal mb-1.5">Notas adicionales</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-border bg-warmCream focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all resize-none"
              placeholder="Alergias, medicamentos, instrucciones especiales..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal hover:bg-tealDark text-white font-bold py-3.5 rounded-xl text-lg transition-all shadow-lg shadow-teal/25 hover:shadow-xl"
          >
            Confirmar Reserva
          </button>
        </form>
      )}

      {result && (
        <div className={`mt-6 p-6 rounded-2xl flex items-start gap-3 ${
          result.success ? 'bg-green-50 border border-successGreen/30' : 'bg-red-50 border border-errorRed/30'
        }`}>
          {result.success ? (
            <>
              <Check className="w-6 h-6 text-successGreen flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-successGreen">\u00a1Reserva confirmada!</p>
                <p className="text-sm text-bodyText mt-1">
                  {result.booking.dogName} tiene su lugar reservado para el {format(selectedDate, "d 'de' MMMM", { locale: es })}.
                  Te contactaremos por WhatsApp para confirmar los detalles.
                </p>
              </div>
            </>
          ) : (
            <>
              <AlertCircle className="w-6 h-6 text-errorRed flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-errorRed">No se pudo reservar</p>
                <p className="text-sm text-bodyText mt-1">{result.error}</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
