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
                  onClick={() => handleRemoveBooking(b.id, b.dogName)}
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
