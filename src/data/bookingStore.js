const DEFAULT_CAPACITY = {
  small: 6,
  medium: 4,
  large: 3,
}

let capacity = { ...DEFAULT_CAPACITY }
let bookings = {}

export function getCapacity() {
  return { ...capacity }
}

export function setCapacity(newCapacity) {
  capacity = { ...capacity, ...newCapacity }
}

export function getBookingsForDate(dateStr) {
  return bookings[dateStr] || []
}

export function getAvailability(dateStr) {
  const dayBookings = getBookingsForDate(dateStr)
  const used = { small: 0, medium: 0, large: 0 }
  dayBookings.forEach((b) => {
    if (used[b.size] !== undefined) used[b.size]++
  })
  return {
    small: capacity.small - used.small,
    medium: capacity.medium - used.medium,
    large: capacity.large - used.large,
    total:
      capacity.small - used.small +
      (capacity.medium - used.medium) +
      (capacity.large - used.large),
  }
}

export function addBooking(dateStr, booking) {
  if (!bookings[dateStr]) bookings[dateStr] = []
  const avail = getAvailability(dateStr)
  if (avail[booking.size] <= 0) {
    return { success: false, error: 'No hay disponibilidad para este tama\u00f1o.' }
  }
  const newBooking = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    ...booking,
    date: dateStr,
    createdAt: new Date().toISOString(),
  }
  bookings[dateStr].push(newBooking)
  return { success: true, booking: newBooking }
}

export function getAllBookings() {
  return { ...bookings }
}

export function removeBooking(dateStr, bookingId) {
  if (!bookings[dateStr]) return false
  bookings[dateStr] = bookings[dateStr].filter((b) => b.id !== bookingId)
  return true
}
