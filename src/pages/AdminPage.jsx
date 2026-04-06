import { useState } from 'react'
import { format, startOfToday, addDays } from 'date-fns'
import { es } from 'date-fns/locale'
import { Settings, Save, Check, Trash2, Dog, Calendar, Heart, Camera, Plus, PawPrint } from 'lucide-react'
import { getCapacity, setCapacity, getAvailability, getBookingsForDate, removeBooking } from '../data/bookingStore'
import {
  getLucaPhoto, setLucaPhoto,
  getHuespedcitos, addHuespedcito, removeHuespedcito,
  getGalleryPhotos, addGalleryPhoto, removeGalleryPhoto,
} from '../data/contentStore'

export default function AdminPage() {
  const isAuthed = sessionStorage.getItem(SESSION_KEY) === '1'
  const [authed, setAuthed] = useState(isAuthed)

  if (!authed) {
    return <PasscodeGate onUnlock={() => setAuthed(true)} />
  }

  return <AdminPanel onLogout={() => { sessionStorage.removeItem(SESSION_KEY); setAuthed(false) }} />
}

function AdminPanel({ onLogout }) {
  const today = startOfToday()

  // --- Reservas state ---
  const [cap, setCap] = useState(getCapacity())
  const [savedCap, setSavedCap] = useState(false)
  const [selectedDate, setSelectedDate] = useState(format(today, 'yyyy-MM-dd'))
  const [, forceUpdate] = useState(0)

  // --- Luca photo state ---
  const [lucaUrl, setLucaUrl] = useState(getLucaPhoto())
  const [savedLuca, setSavedLuca] = useState(false)

  // --- Huespedcitos state ---
  const [huespedcitos, setHuespedcitos] = useState(getHuespedcitos())
  const [newDog, setNewDog] = useState({ name: '', photoUrl: '', breed: '' })

  // --- Gallery state ---
  const [gallery, setGallery] = useState(getGalleryPhotos())
  const [newPhoto, setNewPhoto] = useState({ url: '', caption: '' })

  // --- Capacity handlers ---
  function handleSaveCapacity() {
    setCapacity(cap)
    setSavedCap(true)
    setTimeout(() => setSavedCap(false), 2000)
  }

  const bookings = getBookingsForDate(selectedDate)
  const availability = getAvailability(selectedDate)
  const dayConfig = getDayConfig(selectedDate)

  function handleRemoveBooking(bookingId, dogName) {
    if (!window.confirm(`¿Cancelar la reserva de ${dogName}? Esta acción no se puede deshacer.`)) return
    removeBooking(selectedDate, bookingId)
    forceUpdate((n) => n + 1)
  }

  // --- Luca photo handlers ---
  function handleSaveLuca() {
    setLucaPhoto(lucaUrl.trim())
    setSavedLuca(true)
    setTimeout(() => setSavedLuca(false), 2000)
  }

  // --- Huespedcito handlers ---
  function handleAddDog() {
    if (!newDog.name.trim() || !newDog.photoUrl.trim()) return
    addHuespedcito(newDog)
    const updated = getHuespedcitos()
    setHuespedcitos(updated)
    setNewDog({ name: '', photoUrl: '', breed: '' })
  }

  function handleRemoveDog(id, name) {
    if (!window.confirm(`¿Eliminar a ${name} de los huespedcitos?`)) return
    removeHuespedcito(id)
    setHuespedcitos(getHuespedcitos())
  }

  // --- Gallery handlers ---
  function handleAddPhoto() {
    if (!newPhoto.url.trim()) return
    addGalleryPhoto(newPhoto)
    setGallery(getGalleryPhotos())
    setNewPhoto({ url: '', caption: '' })
  }

  function handleRemovePhoto(id) {
    if (!window.confirm('¿Eliminar esta foto de la galería?')) return
    removeGalleryPhoto(id)
    setGallery(getGalleryPhotos())
  }

  const sizeLabel = { small: 'Pequeño', medium: 'Mediano', large: 'Grande' }
  const sizeEmoji = { small: '🐶', medium: '🐕', large: '🦮' }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16 space-y-8">

      {/* Header */}
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 text-tealDark font-semibold text-sm bg-tealLight px-3 py-1 rounded-full mb-4">
          <Settings className="w-4 h-4" />
          Panel Admin
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-charcoal mb-2">Administración</h1>
        <p className="text-mutedText">Configura el contenido y las reservas</p>
      </div>

      {/* ── Luca Toni Photo ── */}
      <div className="bg-white rounded-2xl border border-border p-6 md:p-8">
        <h2 className="text-xl font-bold text-charcoal mb-6 flex items-center gap-2">
          <Heart className="w-5 h-5 text-coral" />
          Foto de Luca Toni
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-charcoal mb-2">URL de la foto</label>
            <input
              type="url"
              placeholder="https://..."
              value={lucaUrl}
              onChange={(e) => setLucaUrl(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-warmCream focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all text-sm"
            />
            <p className="text-xs text-mutedText mt-1.5">Aparece en la sección "Nuestra Historia" de la página principal.</p>
          </div>
          {lucaUrl && (
            <img
              src={lucaUrl}
              alt="Luca Toni preview"
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md flex-shrink-0"
              onError={(e) => { e.target.style.display = 'none' }}
            />
          )}
        </div>
        <button
          onClick={handleSaveLuca}
          className={`mt-4 flex items-center gap-2 py-2.5 px-6 rounded-xl font-bold text-sm transition-all ${
            savedLuca
              ? 'bg-successGreen text-white'
              : 'bg-coral hover:bg-coralDark text-white shadow-md shadow-coral/25'
          }`}
        >
          {savedLuca ? <><Check className="w-4 h-4" /> ¡Guardado!</> : <><Save className="w-4 h-4" /> Guardar Foto</>}
        </button>
      </div>

      {/* ── Huespedcitos ── */}
      <div className="bg-white rounded-2xl border border-border p-6 md:p-8">
        <h2 className="text-xl font-bold text-charcoal mb-6 flex items-center gap-2">
          <PawPrint className="w-5 h-5 text-teal" />
          Huespedcitos
          <span className="ml-auto text-sm font-normal text-mutedText">{huespedcitos.length} perrito{huespedcitos.length !== 1 ? 's' : ''}</span>
        </h2>

        {/* Add form */}
        <div className="bg-warmCream rounded-xl p-4 mb-6">
          <p className="text-sm font-semibold text-charcoal mb-3">Agregar perrito</p>
          <div className="grid sm:grid-cols-3 gap-3 mb-3">
            <input
              type="text"
              placeholder="Nombre *"
              value={newDog.name}
              onChange={(e) => setNewDog({ ...newDog, name: e.target.value })}
              className="px-3 py-2.5 rounded-xl border border-border bg-white focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all text-sm"
            />
            <input
              type="text"
              placeholder="Raza (opcional)"
              value={newDog.breed}
              onChange={(e) => setNewDog({ ...newDog, breed: e.target.value })}
              className="px-3 py-2.5 rounded-xl border border-border bg-white focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all text-sm"
            />
            <input
              type="url"
              placeholder="URL de la foto *"
              value={newDog.photoUrl}
              onChange={(e) => setNewDog({ ...newDog, photoUrl: e.target.value })}
              className="px-3 py-2.5 rounded-xl border border-border bg-white focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all text-sm"
            />
          </div>
          <button
            onClick={handleAddDog}
            disabled={!newDog.name.trim() || !newDog.photoUrl.trim()}
            className="flex items-center gap-2 py-2.5 px-5 rounded-xl font-bold text-sm bg-teal hover:bg-tealDark text-white transition-all shadow-md shadow-teal/25 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" /> Agregar
          </button>
        </div>

        {/* Grid */}
        {huespedcitos.length === 0 ? (
          <div className="text-center py-8 text-mutedText">
            <Dog className="w-10 h-10 mx-auto mb-3 text-border" />
            <p className="text-sm">Aún no hay huespedcitos. ¡Agrega el primero!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {huespedcitos.map((dog) => (
              <div key={dog.id} className="relative group">
                <img
                  src={dog.photoUrl}
                  alt={dog.name}
                  className="w-full aspect-square object-cover rounded-2xl border border-border"
                  onError={(e) => { e.target.src = '' }}
                />
                <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => handleRemoveDog(dog.id, dog.name)}
                    className="p-2 bg-white rounded-lg text-errorRed shadow-md"
                    aria-label={`Eliminar ${dog.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-2 text-center">
                  <p className="font-bold text-charcoal text-sm leading-tight">{dog.name}</p>
                  {dog.breed && <p className="text-xs text-mutedText">{dog.breed}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Gallery Photos ── */}
      <div className="bg-white rounded-2xl border border-border p-6 md:p-8">
        <h2 className="text-xl font-bold text-charcoal mb-6 flex items-center gap-2">
          <Camera className="w-5 h-5 text-teal" />
          Galería de Fotos
          <span className="ml-auto text-sm font-normal text-mutedText">{gallery.length} foto{gallery.length !== 1 ? 's' : ''}</span>
        </h2>

        {/* Add form */}
        <div className="bg-warmCream rounded-xl p-4 mb-6">
          <p className="text-sm font-semibold text-charcoal mb-3">Agregar foto</p>
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <input
              type="url"
              placeholder="URL de la foto *"
              value={newPhoto.url}
              onChange={(e) => setNewPhoto({ ...newPhoto, url: e.target.value })}
              className="px-3 py-2.5 rounded-xl border border-border bg-white focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all text-sm"
            />
            <input
              type="text"
              placeholder="Descripción (opcional)"
              value={newPhoto.caption}
              onChange={(e) => setNewPhoto({ ...newPhoto, caption: e.target.value })}
              className="px-3 py-2.5 rounded-xl border border-border bg-white focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all text-sm"
            />
          </div>
          <button
            onClick={handleAddPhoto}
            disabled={!newPhoto.url.trim()}
            className="flex items-center gap-2 py-2.5 px-5 rounded-xl font-bold text-sm bg-teal hover:bg-tealDark text-white transition-all shadow-md shadow-teal/25 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" /> Agregar
          </button>
        </div>

        {/* Grid */}
        {gallery.length === 0 ? (
          <div className="text-center py-8 text-mutedText">
            <Camera className="w-10 h-10 mx-auto mb-3 text-border" />
            <p className="text-sm">La galería está vacía. ¡Agrega la primera foto!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {gallery.map((photo) => (
              <div key={photo.id} className="relative group">
                <img
                  src={photo.url}
                  alt={photo.caption || 'Foto de la casita'}
                  className="w-full aspect-square object-cover rounded-2xl border border-border"
                />
                <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                  {photo.caption && (
                    <span className="text-white text-xs font-medium bg-black/50 rounded-lg px-2 py-1 line-clamp-2 flex-1 mr-2">
                      {photo.caption}
                    </span>
                  )}
                  <button
                    onClick={() => handleRemovePhoto(photo.id)}
                    className="p-2 bg-white rounded-lg text-errorRed shadow-md flex-shrink-0"
                    aria-label="Eliminar foto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Capacity ── */}
      <div className="bg-white rounded-2xl border border-border p-6 md:p-8">
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
            savedCap
              ? 'bg-successGreen text-white'
              : 'bg-teal hover:bg-tealDark text-white shadow-lg shadow-teal/25'
          }`}
        >
          {savedCap ? <><Check className="w-5 h-5" /> ¡Guardado!</> : <><Save className="w-5 h-5" /> Guardar Capacidad</>}
        </button>
      </div>

      {/* ── Reservas ── */}
      <div className="bg-white rounded-2xl border border-border p-6 md:p-8">
        <h2 className="text-xl font-bold text-charcoal mb-6 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-teal" />
          Reservas del Día
        </h2>

        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 -mx-1 px-1">
          {days30.map((day) => {
            const dayStr = format(day, 'yyyy-MM-dd')
            const cfg = getDayConfig(dayStr)
            const isSelected = dayStr === selectedDate
            const hasCap = cfg.capacity != null
            return (
              <button
                key={dayStr}
                onClick={() => { setSelectedDate(dayStr); setDayCapOverride(null) }}
                className={`flex-shrink-0 flex flex-col items-center py-2 px-3 rounded-xl transition-all ${
                  isSelected
                    ? 'bg-teal text-white shadow-lg shadow-teal/25'
                    : cfg.closed
                    ? 'bg-coralLight text-coral border border-coral/20'
                    : 'bg-bgGray hover:bg-tealLight text-charcoal'
                }`}
              >
                <span className={`text-[10px] font-semibold uppercase mb-0.5 ${isSelected ? 'text-white/70' : 'text-mutedText'}`}>
                  {format(day, 'EEE', { locale: es })}
                </span>
                <span className="text-sm font-bold">{format(day, 'd')}</span>
                {cfg.closed && !isSelected && <Ban className="w-3 h-3 mt-0.5 text-coral" />}
                {hasCap && !cfg.closed && !isSelected && <span className="text-[9px] text-tealDark font-semibold mt-0.5">adj</span>}
              </button>
            )
          })}
        </div>

        <div className="bg-warmCream rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-bold text-charcoal capitalize">
                {format(new Date(selectedDate + 'T12:00:00'), "EEEE d 'de' MMMM", { locale: es })}
              </p>
              {dayConfig.closed && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-coral bg-coralLight px-2 py-0.5 rounded-full mt-1">
                  <Ban className="w-3 h-3" /> Día cerrado
                </span>
              )}
              {dayConfig.capacity && !dayConfig.closed && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-tealDark bg-tealLight px-2 py-0.5 rounded-full mt-1">
                  Capacidad personalizada
                </span>
              )}
            </div>
            <button
              onClick={handleToggleClosed}
              className={`flex items-center gap-1.5 text-sm font-semibold py-2 px-4 rounded-xl transition-all ${
                dayConfig.closed
                  ? 'bg-successGreen text-white'
                  : 'bg-coralLight text-coral hover:bg-coral/20'
              }`}
            >
              {dayConfig.closed ? <><Check className="w-4 h-4" /> Reabrir</> : <><Ban className="w-4 h-4" /> Cerrar día</>}
            </button>
          </div>

          {!dayConfig.closed && (
            <>
              {dayCapOverride ? (
                <div>
                  <p className="text-sm font-semibold text-charcoal mb-3">Capacidad para este día:</p>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {Object.entries(sizeLabel).map(([key, label]) => (
                      <div key={key} className="text-center">
                        <label className="block text-xs font-semibold text-mutedText mb-1">{sizeEmoji[key]} {label}</label>
                        <input
                          type="number"
                          min={0}
                          max={20}
                          value={dayCapOverride[key]}
                          onChange={(e) => setDayCapOverride({ ...dayCapOverride, [key]: parseInt(e.target.value) || 0 })}
                          className="w-full px-3 py-2 rounded-xl border border-border bg-white focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 text-center text-lg font-bold"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveDayCap}
                      className="flex items-center gap-1.5 py-2 px-4 rounded-xl font-bold text-sm bg-teal text-white hover:bg-tealDark transition-all"
                    >
                      <Save className="w-4 h-4" /> Guardar
                    </button>
                    <button
                      onClick={() => setDayCapOverride(null)}
                      className="flex items-center gap-1.5 py-2 px-4 rounded-xl font-bold text-sm bg-bgGray text-charcoal hover:bg-border transition-all"
                    >
                      <X className="w-4 h-4" /> Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={handleEditDayCapacity}
                    className="flex items-center gap-1.5 py-2 px-4 rounded-xl font-semibold text-sm bg-white border border-border text-charcoal hover:border-teal hover:text-tealDark transition-all"
                  >
                    <Settings className="w-4 h-4" /> Ajustar capacidad
                  </button>
                  {dayConfig.capacity && (
                    <button
                      onClick={handleResetDayCap}
                      className="flex items-center gap-1.5 py-2 px-4 rounded-xl font-semibold text-sm text-mutedText hover:text-errorRed transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" /> Restablecer
                    </button>
                  )}
                  {savedDay && (
                    <span className="flex items-center gap-1 text-sm text-successGreen font-semibold">
                      <Check className="w-4 h-4" /> Guardado!
                    </span>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <AdminSection icon={Calendar} iconColor="text-teal" title="Reservas del Día">
        <div className="mb-4">
          <p className="text-sm font-semibold text-charcoal mb-1 capitalize">
            {format(new Date(selectedDate + 'T12:00:00'), "EEEE d 'de' MMMM", { locale: es })}
          </p>
          {availability.closed ? (
            <p className="text-sm text-coral font-semibold mt-1">Día cerrado — sin reservas posibles</p>
          ) : (
            <div className="grid grid-cols-3 gap-3 mt-3">
              {Object.entries(sizeLabel).map(([key, label]) => (
                <div key={key} className="bg-warmCream rounded-xl p-3 text-center">
                  <span className="text-xs font-semibold text-charcoal">{label}</span>
                  <div className="text-xl font-extrabold text-tealDark mt-1">
                    {availability[key]}
                    <span className="text-xs text-mutedText font-normal">
                      /{(dayConfig.capacity || getCapacity())[key]}
                    </span>
                  </div>
                  <span className="text-[11px] text-mutedText">disponibles</span>
                </div>
              ))}
            </div>
          )}
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
                    {b.notes && <div className="text-xs text-mutedText mt-0.5 italic">{b.notes}</div>}
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveBooking(b.id, b.dogName)}
                  className="p-2 rounded-lg text-errorRed hover:bg-coralLight transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </AdminSection>

    </div>
  )
}
