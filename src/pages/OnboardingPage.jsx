import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ChevronLeft, ChevronDown, Check, User, Dog, Heart, FileText, PawPrint } from 'lucide-react'

const STEPS = [
  { id: 'owner', title: 'Sobre Ti', subtitle: 'Datos del dueño', icon: User },
  { id: 'dog', title: 'Tu Perrito', subtitle: 'Datos de tu peludo', icon: Dog },
  { id: 'health', title: 'Salud', subtitle: 'Info médica importante', icon: Heart },
  { id: 'preferences', title: 'Preferencias', subtitle: 'Cómo le gusta pasarla', icon: FileText },
]

const INITIAL_DATA = {
  ownerName: '', ownerPhone: '', ownerEmail: '', emergencyContact: '', emergencyPhone: '',
  dogName: '', breed: '', age: '', weight: '', sex: '', neutered: '',
  vaccinated: '', lastVaccine: '', allergies: '', medications: '', vetName: '', vetPhone: '',
  feeding: '', foodBrand: '', feedingSchedule: '', specialInstructions: '', socialization: '', fears: '',
}

function ProgressBar({ currentStep, totalSteps }) {
  const progress = ((currentStep + 1) / totalSteps) * 100
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-3">
        {STEPS.map((step, i) => {
          const Icon = step.icon
          const isComplete = i < currentStep
          const isCurrent = i === currentStep
          return (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-1.5 transition-all ${
                  isComplete
                    ? 'bg-teal text-white'
                    : isCurrent
                    ? 'bg-tealLight text-tealDark border-2 border-teal'
                    : 'bg-bgGray text-mutedText'
                }`}
              >
                {isComplete ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
              </div>
              <span className={`text-xs font-semibold hidden sm:block ${isCurrent ? 'text-tealDark' : 'text-mutedText'}`}>
                {step.title}
              </span>
            </div>
          )
        })}
      </div>
      <div className="h-2 bg-bgGray rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-teal to-tealDark rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-center text-sm text-mutedText mt-2">
        Paso {currentStep + 1} de {totalSteps}
      </p>
    </div>
  )
}

function InputField({ label, required, ...props }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-charcoal mb-1.5">
        {label} {required && <span className="text-coral">*</span>}
      </label>
      <input
        required={required}
        className="w-full px-4 py-3 rounded-xl border border-border bg-warmCream focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all"
        {...props}
      />
    </div>
  )
}

function SelectField({ label, required, options, ...props }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-charcoal mb-1.5">
        {label} {required && <span className="text-coral">*</span>}
      </label>
      <div className="relative">
        <select
          required={required}
          className="w-full px-4 py-3 rounded-xl border border-border bg-warmCream focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all appearance-none pr-10"
          {...props}
        >
          <option value="">Seleccionar...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-mutedText" />
      </div>
    </div>
  )
}

function TextAreaField({ label, required, ...props }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-charcoal mb-1.5">
        {label} {required && <span className="text-coral">*</span>}
      </label>
      <textarea
        required={required}
        rows={3}
        className="w-full px-4 py-3 rounded-xl border border-border bg-warmCream focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all resize-none"
        {...props}
      />
    </div>
  )
}

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState(INITIAL_DATA)
  const [submitted, setSubmitted] = useState(false)

  const update = (field, value) => setData({ ...data, [field]: value })

  function next() {
    if (step < STEPS.length - 1) setStep(step + 1)
  }

  function prev() {
    if (step > 0) setStep(step - 1)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-tealLight rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-teal" />
        </div>
        <h1 className="text-3xl font-extrabold text-charcoal mb-4">
          ¡Registro Completo!
        </h1>
        <p className="text-lg text-bodyText mb-2">
          <strong>{data.dogName}</strong> ya está registrado en La Casita de Luca.
        </p>
        <p className="text-mutedText">
          Jona &amp; Cristy revisarán la información y te contactarán por WhatsApp para coordinar la primera visita.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/reservar"
            className="inline-flex items-center justify-center gap-2 bg-teal hover:bg-tealDark text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-teal/25 no-underline"
          >
            Reservar ahora
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-bgGray text-charcoal font-semibold py-3 px-6 rounded-xl border-2 border-border transition-all no-underline"
          >
            Volver al inicio
          </Link>
        </div>
        <div className="mt-8">
          <PawPrint className="w-8 h-8 text-tealMuted mx-auto" />
        </div>
      </div>
    )
  }

  const stepContent = [
    <div key="owner" className="space-y-4">
      <div className="bg-tealLight/50 rounded-xl p-4 mb-2">
        <p className="text-sm text-tealDark font-medium">
          👋 ¡Hola! Empecemos con tus datos. Esto nos ayuda a mantenerte informado sobre tu perrito.
        </p>
      </div>
      <InputField label="Tu nombre completo" required autoComplete="name" value={data.ownerName} onChange={(e) => update('ownerName', e.target.value)} placeholder="Ej: María García" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField label="Teléfono / WhatsApp" required type="tel" autoComplete="tel" value={data.ownerPhone} onChange={(e) => update('ownerPhone', e.target.value)} placeholder="+507 6000-0000" />
        <InputField label="Correo electrónico" type="email" autoComplete="email" value={data.ownerEmail} onChange={(e) => update('ownerEmail', e.target.value)} placeholder="tu@email.com" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField label="Contacto de emergencia" required value={data.emergencyContact} onChange={(e) => update('emergencyContact', e.target.value)} placeholder="Nombre" />
        <InputField label="Teléfono de emergencia" required value={data.emergencyPhone} onChange={(e) => update('emergencyPhone', e.target.value)} placeholder="+507 6000-0000" />
      </div>
    </div>,

    <div key="dog" className="space-y-4">
      <div className="bg-coralLight/50 rounded-xl p-4 mb-2">
        <p className="text-sm text-coralDark font-medium">
          🐾 ¡Cuéntanos sobre tu perrito! Queremos conocerlo para darle la mejor experiencia.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField label="Nombre del perrito" required value={data.dogName} onChange={(e) => update('dogName', e.target.value)} placeholder="Ej: Luna" />
        <InputField label="Raza" required value={data.breed} onChange={(e) => update('breed', e.target.value)} placeholder="Ej: French Bulldog" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <InputField label="Edad" required value={data.age} onChange={(e) => update('age', e.target.value)} placeholder="Ej: 3 años" />
        <InputField label="Peso (kg)" required value={data.weight} onChange={(e) => update('weight', e.target.value)} placeholder="Ej: 8" />
        <SelectField
          label="Sexo"
          required
          value={data.sex}
          onChange={(e) => update('sex', e.target.value)}
          options={[
            { value: 'male', label: 'Macho' },
            { value: 'female', label: 'Hembra' },
          ]}
        />
      </div>
      <SelectField
        label="¿Está esterilizado/a?"
        required
        value={data.neutered}
        onChange={(e) => update('neutered', e.target.value)}
        options={[
          { value: 'yes', label: 'Sí' },
          { value: 'no', label: 'No' },
        ]}
      />
    </div>,

    <div key="health" className="space-y-4">
      <div className="bg-tealLight/50 rounded-xl p-4 mb-2">
        <p className="text-sm text-tealDark font-medium">
          💉 Info médica importante para cuidar bien a tu perrito.
        </p>
      </div>
      <SelectField
        label="¿Tiene vacunas al día?"
        required
        value={data.vaccinated}
        onChange={(e) => update('vaccinated', e.target.value)}
        options={[
          { value: 'yes', label: 'Sí, todas al día' },
          { value: 'partial', label: 'Algunas pendientes' },
          { value: 'no', label: 'No' },
        ]}
      />
      <InputField label="Fecha de última vacuna" type="date" value={data.lastVaccine} onChange={(e) => update('lastVaccine', e.target.value)} />
      <TextAreaField label="¿Tiene alergias?" value={data.allergies} onChange={(e) => update('allergies', e.target.value)} placeholder="Describe si tiene alguna alergia conocida" />
      <TextAreaField label="Medicamentos actuales" value={data.medications} onChange={(e) => update('medications', e.target.value)} placeholder="¿Toma algún medicamento? Incluye dosis y horarios" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField label="Nombre del veterinario" value={data.vetName} onChange={(e) => update('vetName', e.target.value)} placeholder="Dr. / Clínica" />
        <InputField label="Teléfono del veterinario" value={data.vetPhone} onChange={(e) => update('vetPhone', e.target.value)} placeholder="+507 ..." />
      </div>
    </div>,

    <div key="preferences" className="space-y-4">
      <div className="bg-coralLight/50 rounded-xl p-4 mb-2">
        <p className="text-sm text-coralDark font-medium">
          🎾 ¡Último paso! Cuéntanos cómo le gusta pasarla a tu perrito.
        </p>
      </div>
      <SelectField
        label="¿Come comida casera o concentrado?"
        required
        value={data.feeding}
        onChange={(e) => update('feeding', e.target.value)}
        options={[
          { value: 'kibble', label: 'Concentrado / Croquetas' },
          { value: 'homemade', label: 'Comida casera' },
          { value: 'mixed', label: 'Mixto' },
          { value: 'raw', label: 'Dieta BARF / cruda' },
        ]}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField label="Marca de comida" value={data.foodBrand} onChange={(e) => update('foodBrand', e.target.value)} placeholder="Ej: Royal Canin" />
        <InputField label="Horario de comida" value={data.feedingSchedule} onChange={(e) => update('feedingSchedule', e.target.value)} placeholder="Ej: 7 AM y 5 PM" />
      </div>
      <SelectField
        label="¿Cómo se lleva con otros perros?"
        required
        value={data.socialization}
        onChange={(e) => update('socialization', e.target.value)}
        options={[
          { value: 'great', label: 'Excelente, le encanta jugar' },
          { value: 'good', label: 'Bien, pero necesita tiempo' },
          { value: 'shy', label: 'Es tímido/a al principio' },
          { value: 'selective', label: 'Selectivo, depende del perro' },
          { value: 'not_good', label: 'No se lleva bien' },
        ]}
      />
      <TextAreaField label="¿Tiene miedos o fobias?" value={data.fears} onChange={(e) => update('fears', e.target.value)} placeholder="Ej: Truenos, aspiradora, personas con gorra..." />
      <TextAreaField label="Instrucciones especiales" value={data.specialInstructions} onChange={(e) => update('specialInstructions', e.target.value)} placeholder="Cualquier otra cosa que debamos saber..." />
    </div>,
  ]

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 md:py-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-charcoal mb-2">
          Registro de Perrito
        </h1>
        <p className="text-mutedText">Llena el formulario para que conozcamos a tu peludo</p>
      </div>

      <ProgressBar currentStep={step} totalSteps={STEPS.length} />

      <form onSubmit={step === STEPS.length - 1 ? handleSubmit : (e) => { e.preventDefault(); next() }}>
        <div className="bg-white rounded-2xl border border-border p-6 md:p-8 mb-6">
          <h2 className="text-xl font-bold text-charcoal mb-1 flex items-center gap-2">
            {(() => { const Icon = STEPS[step].icon; return <Icon className="w-5 h-5 text-teal" /> })()}
            {STEPS[step].title}
          </h2>
          <p className="text-sm text-mutedText mb-6">{STEPS[step].subtitle}</p>
          {stepContent[step]}
        </div>

        <div className="flex justify-between">
          {step > 0 ? (
            <button
              type="button"
              onClick={prev}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-border bg-white text-charcoal font-semibold hover:bg-bgGray transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              Atrás
            </button>
          ) : (
            <div />
          )}
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-teal hover:bg-tealDark text-white font-bold transition-all shadow-lg shadow-teal/25"
          >
            {step === STEPS.length - 1 ? (
              <>
                <Check className="w-4 h-4" />
                Enviar Registro
              </>
            ) : (
              <>
                Siguiente
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
