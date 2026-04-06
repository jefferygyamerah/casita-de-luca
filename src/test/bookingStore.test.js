import { describe, it, expect, beforeEach } from 'vitest'
import {
  getCapacity, setCapacity,
  getAvailability, addBooking, removeBooking, getBookingsForDate,
  getDayConfig, setDayCapacity, resetDayCapacity, isDayClosed, setDayClosed,
} from '../data/bookingStore'

const TODAY = '2026-04-06'

beforeEach(() => {
  localStorage.clear()
})

describe('getCapacity', () => {
  it('returns defaults when nothing stored', () => {
    const cap = getCapacity()
    expect(cap.small).toBe(6)
    expect(cap.medium).toBe(4)
    expect(cap.large).toBe(3)
  })

  it('persists changes via setCapacity', () => {
    setCapacity({ small: 10, medium: 2, large: 1 })
    expect(getCapacity().small).toBe(10)
    expect(getCapacity().medium).toBe(2)
  })
})

describe('addBooking / getAvailability', () => {
  it('reduces availability after booking', () => {
    const before = getAvailability(TODAY).small
    addBooking(TODAY, { size: 'small', ownerName: 'A', dogName: 'Dog', phone: '1' })
    expect(getAvailability(TODAY).small).toBe(before - 1)
  })

  it('returns success on valid booking', () => {
    const res = addBooking(TODAY, { size: 'medium', ownerName: 'B', dogName: 'Rex', phone: '2' })
    expect(res.success).toBe(true)
    expect(res.booking.dogName).toBe('Rex')
  })

  it('rejects booking when day is closed', () => {
    setDayClosed(TODAY, true)
    const res = addBooking(TODAY, { size: 'small', ownerName: 'C', dogName: 'X', phone: '3' })
    expect(res.success).toBe(false)
    expect(res.error).toMatch(/no está disponible/i)
  })

  it('rejects when size is full', () => {
    const cap = getCapacity()
    for (let i = 0; i < cap.large; i++) {
      addBooking(TODAY, { size: 'large', ownerName: 'O', dogName: 'D' + i, phone: '0' })
    }
    const res = addBooking(TODAY, { size: 'large', ownerName: 'Over', dogName: 'Over', phone: '0' })
    expect(res.success).toBe(false)
  })
})

describe('removeBooking', () => {
  it('removes a booking and restores availability', () => {
    const res = addBooking(TODAY, { size: 'small', ownerName: 'Del', dogName: 'Rover', phone: '9' })
    const before = getAvailability(TODAY).small
    removeBooking(TODAY, res.booking.id)
    expect(getAvailability(TODAY).small).toBe(before + 1)
    expect(getBookingsForDate(TODAY).find(b => b.id === res.booking.id)).toBeUndefined()
  })
})

describe('per-day capacity overrides', () => {
  it('setDayCapacity overrides for specific day', () => {
    setDayCapacity(TODAY, { small: 1, medium: 1, large: 1 })
    expect(getAvailability(TODAY).small).toBe(1)
  })

  it('resetDayCapacity reverts to global default', () => {
    setDayCapacity(TODAY, { small: 1, medium: 1, large: 1 })
    resetDayCapacity(TODAY)
    expect(getAvailability(TODAY).small).toBe(getCapacity().small)
  })

  it('closed day returns zero availability', () => {
    setDayClosed(TODAY, true)
    const avail = getAvailability(TODAY)
    expect(avail.closed).toBe(true)
    expect(avail.total).toBe(0)
  })

  it('reopened day returns normal availability', () => {
    setDayClosed(TODAY, true)
    setDayClosed(TODAY, false)
    expect(isDayClosed(TODAY)).toBe(false)
    expect(getAvailability(TODAY).total).toBeGreaterThan(0)
  })
})
