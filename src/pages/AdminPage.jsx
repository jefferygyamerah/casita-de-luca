import { useState } from 'react'
import { format, startOfToday, addDays } from 'date-fns'
import { es } from 'date-fns/locale'
import {
  Settings, Save, Check, Trash2, Dog, Calendar, Heart, Camera, Plus,
  PawPrint, Lock, Eye, EyeOff, X, Ban, RotateCcw, FileText,
} from 'lucide-react'
import {
  getCapacity, setCapacity,
  getAvailability, getBookingsForDate, removeBooking,
  getDayConfig, setDayCapacity, resetDayCapacity, setDayClosed,
} from '../data/bookingStore'
import {
  getLucaPhoto, setLucaPhoto,
  getHuespedcitos, addHuespedcito, removeHuespedcito,
  getGalleryPhotos, addGalleryPhoto, removeGalleryPhoto,
  getPageContent, setPageContent,
} from '../data/contentStore'

const PASSCODE = 'passcode'
const SESSION_KEY = 'casita_admin_auth'

function PasscodeGate({ onUnlock }) {
  const [value, setValue] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (value === PASSCODE) {
      sessionStorage.setItem(SESSION_KEY, '1')
      onUnlock()
    } else {
      setError(true)
      setValue('')
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-tealLight flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-tealDark" />
          </div>
          <h1 className="text-2xl font-extrabold text-charcoal mb-1">Panel Admin</h1>
          <p className="text-mutedText text-sm">Ingresa el código de acceso para continuar.</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-border p-6 shadow-sm">
          <label className="block text-sm font-semibold text-charcoal mb-2">Código de acceso</label>
          <div className="relative mb-4">
            <input
              autoFocus
              type={showPass ? 'text' : 'password'}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="••••••••"
              className={`w-full px-4 py-3 rounded-xl border pr-12 focus:outline-none focus:ring-2 transition-all text-sm ${
                error
                  ? 'border-errorRed bg-red-50 focus:ring-errorRed/20 text-errorRed'
                  : 'border-border bg-warmCream focus:border-teal focus:ring-teal/20'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPass((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-mutedText hover:text-charcoal transition-colors"
              tabIndex={-1}
            >
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {error && <p className="text-xs text-errorRed mb-3 -mt-2">Código incorrecto. Intenta de nuevo.</p>}
          <button
            type="submit"
            className="w-full bg-teal hover:bg-tealDark text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-teal/25"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}

function AdminSection({ icon: Icon, iconColor = 'text-teal', title, badge, children }) {
  return (
    <div className="bg-white rounded-2xl border border-border p-6 md:p-8">
      <h2 className="text-xl font-bold text-charcoal mb-6 flex items-center gap-2">
        <Icon className={`w-5 h-5 ${iconColor}`} />
        {title}
        {badge != null && (
          <span className="ml-auto text-sm font-normal text-mutedText">{badge}</span>
        )}
      </h2>
      {children}
    </div>
  )
}

function InputField({ label, hint, ...props }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-charcoal mb-1.5">{label}</label>
      <input
        {...props}
        className="w-full px-4 py-3 rounded-xl border border-border bg-warmCream focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all text-sm"
      />
      {hint && <p className="text-xs text-mutedText mt-1">{hint}</p>}
    </div>
  )
}

function SaveButton({ saved, onClick, label = 'Guardar' }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 py-2.5 px-6 rounded-xl font-bold text-sm transition-all ${
        saved
          ? 'bg-successGreen text-white'
          : 'bg-teal hover:bg-tealDark text-white shadow-md shadow-teal/25'
      }`}
    >
      {saved ? <><Check className="w-4 h-4" /> Guardado!</> : <><Save className="w-4 h-4" /> {label}</>}
    </button>
  )
}

const sizeLabel = { small: 'Pequeño', medium: 'Mediano', large: 'Grande' }
const sizeEmoji = { small: '🐶', medium: '🐕', large: '🦮' }

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

  const [selectedDate, setSelectedDate] = useState(format(today, 'yyyy-MM-dd'))
  const [, forceUpdate] = useState(0)

  const [cap, setCap] = useState(getCapacity())
  const [savedCap, setSavedCap] = useState(false)

  const [dayCapOverride, setDayCapOverride] = useState(null)
  const [savedDay, setSavedDay] = useState(false)

  const [content, setContent] = useState(getPageContent())
  const [savedContent, setSavedContent] = useState(false)

  const [lucaUrl, setLucaUrl] = useState(getLucaPhoto())
  const [savedLuca, setSavedLuca] = useState(false)

  const [huespedcitos, setHuespedcitos] = useState(getHuespedcitos())
  const [newDog, setNewDog] = useState({ name: '', photoUrl: '', breed: '' })

  const [gallery, setGallery] = useState(getGalleryPhotos())
  const [newPhoto, setNewPhoto] = useState({ url: '', caption: '' })

  const bookings = getBookingsForDate(selectedDate)
  const availability = getAvailability(selectedDate)
  const dayConfig = getDayConfig(selectedDate)

  function handleRemoveBooking(bookingId, dogName) {
    if (!window.confirm('Cancelar la reserva de ' + dogName + '?')) return
    removeBooking(selectedDate, bookingId)
    forceUpdate((n) => n + 1)
  }

  function handleSaveGlobalCap() {
    setCapacity(cap)
    setSavedCap(true)
    setTimeout(() => setSavedCap(false), 2000)
  }

  function handleEditDayCapacity() {
    const current = dayConfig.capacity || getCapacity()
    setDayCapOverride({ ...current })
  }

  function handleSaveDayCap() {
    setDayCapacity(selectedDate, dayCapOverride)
    setDayCapOverride(null)
    setSavedDay(true)
    forceUpdate((n) => n + 1)
    setTimeout(() => setSavedDay(false), 2000)
  }

  function handleResetDayCap() {
    resetDayCapacity(selectedDate)
    setDayCapOverride(null)
    forceUpdate((n) => n + 1)
  }

  function handleToggleClosed() {
    const closing = !dayConfig.closed
    if (closing && !window.confirm('Cerrar este dia para nuevas reservas?')) return
    setDayClosed(selectedDate, closing)
    forceUpdate((n) => n + 1)
  }

  function handleSaveContent() {
    setPageContent(content)
    setSavedContent(true)
    setTimeout(() => setSavedContent(false), 2000)
  }

  function handleSaveLuca() {
    setLucaPhoto(lucaUrl.trim())
    setSavedLuca(true)
    setTimeout(() => setSavedLuca(false), 2000)
  }

  function handleAddDog() {
    if (!newDog.name.trim() || !newDog.photoUrl.trim()) return
    addHuespedcito(newDog)
    setHuespedcitos(getHuespedcitos())
    setNewDog({ name: '', photoUrl: '', breed: '' })
  }

  function handleRemoveDog(id, name) {
    if (!window.confirm('Eliminar a ' + name + ' de los huespedcitos?')) return
    removeHuespedcito(id)
    setHuespedcitos(getHuespedcitos())
  }

  function handleAddPhoto() {
    if (!newPhoto.url.trim()) return
    addGalleryPhoto(newPhoto)
    setGallery(getGalleryPhotos())
    setNewPhoto({ url: '', caption: '' })
  }

  function handleRemovePhoto(id) {
    if (!window.confirm('Eliminar esta foto?')) return
    removeGalleryPhoto(id)
    setGallery(getGalleryPhotos())
  }

  const days30 = Array.from({ length: 30 }, (_, i) => addDays(today, i))

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16 space-y-8">

      <div className="flex items-start justify-between">
        <div>
          <span className="inline-flex items-center gap-1.5 text-tealDark font-semibold text-sm bg-tealLight px-3 py-1 rounded-full mb-3">
            <Settings className="w-4 h-4" />
            Panel Admin
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-charcoal mb-1">Administración</h1>
          <p className="text-mutedText text-sm">Configura contenido, capacidad y reservas.</p>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-1.5 text-sm text-mutedText hover:text-errorRed transition-colors mt-1"
        >
          <Lock className="w-4 h-4" />
          Salir
        </button>
      </div>

      <AdminSection icon={FileText} title="Textos de la Página">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <InputField
            label="Titular del Hero"
            value={content.heroHeadline}
            onChange={(e) => setContent({ ...content, heroHeadline: e.target.value })}
            placeholder="Un hogar lleno de amor..."
          />
          <InputField
            label="Subtítulo del Hero"
            value={content.heroSubtext}
            onChange={(e) => setContent({ ...content, heroSubtext: e.target.value })}
            placeholder="Cuidamos a tu perrito..."
          />
          <InputField
            label="Número de WhatsApp"
            value={content.whatsapp}
            onChange={(e) => setContent({ ...content, whatsapp: e.target.value })}
            placeholder="50766746941"
            hint="Solo dígitos, sin + ni espacios."
          />
          <InputField
            label="Nota de contacto"
            value={content.contactNote}
            onChange={(e) => setContent({ ...content, contactNote: e.target.value })}
            placeholder="Hablemos. Respondemos rápido."
          />
        </div>
        <SaveButton saved={savedContent} onClick={handleSaveContent} label="Guardar Textos" />
      </AdminSection>

      <AdminSection icon={Settings} title="Capacidad Global (por defecto)">
        <p className="text-sm text-mutedText mb-5">
          Se aplica a todos los días que no tengan capacidad específica asignada.
        </p>
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
        <SaveButton saved={savedCap} onClick={handleSaveGlobalCap} label="Guardar Capacidad" />
      </AdminSection>

      <AdminSection icon={Calendar} title="Calendario — Capacidad por Día">
        <p className="text-sm text-mutedText mb-4">
          Selecciona un día para ajustar su capacidad o cerrarlo a reservas.
        </p>

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
      </AdminSection>

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

      <AdminSection icon={Heart} iconColor="text-coral" title="Foto de Luca Toni">
        <div className="flex flex-col sm:flex-row gap-4 items-start mb-4">
          <div className="flex-1">
            <InputField
              label="URL de la foto"
              type="url"
              placeholder="https://..."
              value={lucaUrl}
              onChange={(e) => setLucaUrl(e.target.value)}
              hint="Aparece en la sección Nuestra Historia."
            />
          </div>
          {lucaUrl && (
            <img
              src={lucaUrl}
              alt="Luca preview"
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md flex-shrink-0"
              onError={(e) => { e.target.style.display = 'none' }}
            />
          )}
        </div>
        <SaveButton saved={savedLuca} onClick={handleSaveLuca} label="Guardar Foto" />
      </AdminSection>

      <AdminSection
        icon={PawPrint}
        title="Huespedcitos"
        badge={huespedcitos.length + ' perrito' + (huespedcitos.length !== 1 ? 's' : '')}
      >
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

        {huespedcitos.length === 0 ? (
          <div className="text-center py-8 text-mutedText">
            <Dog className="w-10 h-10 mx-auto mb-3 text-border" />
            <p className="text-sm">Sin huespedcitos aún. Agrega el primero.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {huespedcitos.map((dog) => (
              <div key={dog.id} className="relative group">
                <img
                  src={dog.photoUrl}
                  alt={dog.name}
                  className="w-full aspect-square object-cover rounded-2xl border border-border"
                  onError={(e) => { e.target.style.display = 'none' }}
                />
                <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => handleRemoveDog(dog.id, dog.name)}
                    className="p-2 bg-white rounded-lg text-errorRed shadow-md"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-2 text-center">
                  <p className="font-bold text-charcoal text-sm">{dog.name}</p>
                  {dog.breed && <p className="text-xs text-mutedText">{dog.breed}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminSection>

      <AdminSection
        icon={Camera}
        title="Galería de Fotos"
        badge={gallery.length + ' foto' + (gallery.length !== 1 ? 's' : '')}
      >
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

        {gallery.length === 0 ? (
          <div className="text-center py-8 text-mutedText">
            <Camera className="w-10 h-10 mx-auto mb-3 text-border" />
            <p className="text-sm">La galería está vacía. Agrega la primera foto.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {gallery.map((photo) => (
              <div key={photo.id} className="relative group">
                <img
                  src={photo.url}
                  alt={photo.caption || 'Foto'}
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
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminSection>

    </div>
  )
}
