import { useState } from 'react'
import { format, startOfToday, addDays } from 'date-fns'
import { es } from 'date-fns/locale'
import { Settings, Save, Check, Trash2, Dog, Calendar } from 'lucide-react'
import { getCapacity, setCapacity, getAvailability, getBookingsForDate, removeBooking } from '../data/bookingStore'

export default function AdminPage() {
  const today = startOfToday()
  const [cap, setCap] = useState(getCapacity())
  const [saved, setSaved] = useState(false)
  const [selectedDate, setSelectedDate] = useState(format(today, 'yyyy-MM-dd'))
  const [, forceUpdate] = useState(0)

  function handleSaveCapacity() {
    setCapacity(cap)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const bookings = getBookingsForDate(selectedDate)
  const availability = getAvailability(selectedDate)

  function handleRemove(bookingId, dogName) {
    if (!window.confirm(`¿Cancelar la reserva de ${dogName}? Esta acción no se puede deshacer.`)) return
    removeBooking(selectedDate, bookingId)
    forceUpdate((n) => n + 1)
  }

  const sizeLabel = { small: 'Pequeño', medium: 'Mediano', large: 'Grande' }
  const sizeEmoji = { small: '🐶', medium: '🐕', large: '🦮' }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-1.5 text-tealDark font-semibold text-sm bg-tealLight px-3 py-1 rounded-full mb-4">
          <Settings className="w-4 h-4" />
          Panel Admin
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-charcoal mb-2">
          Administración
        </h1>
        <p className="text-mutedText">Configura capacidades y gestiona reservas</p>
      </div>

      <div className="bg-white rounded-2xl border border-border p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-charcoal mb-6 flex items-center gap-2">
          <Settings className="w-5 h-5 text-teal" />
          Capacidad por Tamaño
        </h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {Object.entries(sizeLabel).map(([key, label]) => (
            <div key={key} className="text-center">
              <span className="text-2xl block mb-2">{sizeEmoji[key]}</span>
              <label className="block text-sm font-semibold text-charcoal mb-2">{label}</label>
              <input
                type="number"
                min={0}
                max={20}
                value={cap[key]}
                onChange={(e) => setCap({ ...cap, [key]: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-warmCream focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all text-center text-xl font-bold"
              />
              <span className="text-xs text-mutedText mt-1 block">espacios</span>
            </div>
          ))}
        </div>
        <button
          onClick={handleSaveCapacity}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${
            saved
              ? 'bg-successGreen text-white'
              : 'bg-teal hover:bg-tealDark text-white shadow-lg shadow-teal/25'
          }`}
        >
          {saved ? <><Check className="w-5 h-5" /> ¡Guardado!</> : <><Save className="w-5 h-5" /> Guardar Capacidad</>}
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-border p-6 md:p-8">
        <h2 className="text-xl font-bold text-charcoal mb-6 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-teal" />
          Reservas del Día
        </h2>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {Array.from({ length: 7 }, (_, i) => {
            const day = addDays(today, i)
            const dayStr = format(day, 'yyyy-MM-dd')
            const isSelected = dayStr === selectedDate
            return (
              <button
                key={dayStr}
                onClick={() => setSelectedDate(dayStr)}
                className={`flex-shrink-0 flex flex-col items-center py-2 px-4 rounded-xl transition-all ${
                  isSelected ? 'bg-teal text-white' : 'bg-bgGray hover:bg-tealLight text-charcoal'
                }`}
              >
                <span className={`text-xs font-semibold capitalize ${isSelected ? 'text-white/70' : 'text-mutedText'}`}>
                  {format(day, 'EEE', { locale: es })}
                </span>
                <span className="text-lg font-bold">{format(day, 'd')}</span>
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {Object.entries(sizeLabel).map(([key, label]) => (
            <div key={key} className="bg-warmCream rounded-xl p-3 text-center">
              <span className="text-sm font-semibold text-charcoal">{label}</span>
              <div className="text-2xl font-extrabold text-tealDark mt-1">
                {availability[key]}<span className="text-sm text-mutedText font-normal">/{cap[key]}</span>
              </div>
              <span className="text-xs text-mutedText">disponibles</span>
            </div>
          ))}
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-8 text-mutedText">
            <Dog className="w-10 h-10 mx-auto mb-3 text-border" />
            <p className="font-medium">No hay reservas para este día</p>
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.map((b) => (
              <div key={b.id} className="flex items-center justify-between bg-warmCream rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{sizeEmoji[b.size]}</span>
                  <div>
                    <span className="font-bold text-charcoal">{b.dogName}</span>
                    <span className="text-sm text-mutedText ml-2">({sizeLabel[b.size]})</span>
                    <div className="text-sm text-mutedText">{b.ownerName} · {b.phone}</div>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(b.id, b.dogName)}
                  className="p-2 rounded-lg text-errorRed hover:bg-coralLight transition-colors"
                  title="Cancelar reserva"
                  aria-label={`Cancelar reserva de ${b.dogName}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
