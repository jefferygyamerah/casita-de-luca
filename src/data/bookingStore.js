// ─── Storage keys ────────────────────────────────────────────────────────────
const KEYS = {
  bookings: 'casita_bookings',
  defaultCap: 'casita_default_cap',
  dayOverrides: 'casita_day_overrides', // { 'yyyy-MM-dd': { capacity?, closed? } }
}

const DEFAULT_CAP = { small: 6, medium: 4, large: 3 }

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch { return fallback }
}

function persist(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
}

// ─── Default (global) capacity ───────────────────────────────────────────────

export function getCapacity() {
  return load(KEYS.defaultCap, DEFAULT_CAP)
}

export function setCapacity(newCap) {
  persist(KEYS.defaultCap, { ...getCapacity(), ...newCap })
}

// ─── Per-day overrides ────────────────────────────────────────────────────────

function getAllOverrides() {
  return load(KEYS.dayOverrides, {})
}

function saveOverrides(overrides) {
  persist(KEYS.dayOverrides, overrides)
}

export function getDayConfig(dateStr) {
  return getAllOverrides()[dateStr] || { capacity: null, closed: false }
}

/** Returns effective capacity for a date (day override → global default). */
export function getCapacityForDate(dateStr) {
  return getDayConfig(dateStr).capacity || getCapacity()
}

export function setDayCapacity(dateStr, capacity) {
  const overrides = getAllOverrides()
  overrides[dateStr] = { ...getDayConfig(dateStr), capacity }
  saveOverrides(overrides)
}

export function resetDayCapacity(dateStr) {
  const overrides = getAllOverrides()
  if (overrides[dateStr]) {
    overrides[dateStr] = { ...overrides[dateStr], capacity: null }
    saveOverrides(overrides)
  }
}

export function isDayClosed(dateStr) {
  return getDayConfig(dateStr).closed === true
}

export function setDayClosed(dateStr, closed) {
  const overrides = getAllOverrides()
  overrides[dateStr] = { ...getDayConfig(dateStr), closed }
  saveOverrides(overrides)
}

// ─── Bookings (persisted to localStorage) ────────────────────────────────────

function rawBookings() {
  return load(KEYS.bookings, {})
}

function saveBookings(all) {
  persist(KEYS.bookings, all)
}

export function getBookingsForDate(dateStr) {
  return rawBookings()[dateStr] || []
}

export function getAllBookings() {
  return rawBookings()
}

export function getAvailability(dateStr) {
  if (isDayClosed(dateStr)) {
    return { small: 0, medium: 0, large: 0, total: 0, closed: true }
  }
  const cap = getCapacityForDate(dateStr)
  const used = { small: 0, medium: 0, large: 0 }
  getBookingsForDate(dateStr).forEach((b) => {
    if (used[b.size] !== undefined) used[b.size]++
  })
  return {
    small: cap.small - used.small,
    medium: cap.medium - used.medium,
    large: cap.large - used.large,
    total: (cap.small - used.small) + (cap.medium - used.medium) + (cap.large - used.large),
    closed: false,
  }
}

export function addBooking(dateStr, booking) {
  if (isDayClosed(dateStr)) {
    return { success: false, error: 'Este día no está disponible para reservas.' }
  }
  const avail = getAvailability(dateStr)
  if (avail[booking.size] <= 0) {
    return { success: false, error: 'No hay disponibilidad para este tamaño.' }
  }
  const all = rawBookings()
  if (!all[dateStr]) all[dateStr] = []
  const newBooking = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    ...booking,
    date: dateStr,
    createdAt: new Date().toISOString(),
  }
  all[dateStr].push(newBooking)
  saveBookings(all)
  return { success: true, booking: newBooking }
}

export function removeBooking(dateStr, bookingId) {
  const all = rawBookings()
  if (!all[dateStr]) return false
  all[dateStr] = all[dateStr].filter((b) => b.id !== bookingId)
  saveBookings(all)
  return true
}
