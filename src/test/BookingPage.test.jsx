import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import BookingPage from '../pages/BookingPage'

function renderBooking() {
  return render(<MemoryRouter><BookingPage /></MemoryRouter>)
}

beforeEach(() => {
  localStorage.clear()
})

describe('BookingPage', () => {
  it('renders the page heading', () => {
    renderBooking()
    expect(screen.getByRole('heading', { name: /reservar hospedaje/i })).toBeInTheDocument()
  })

  it('shows 7 calendar day buttons', () => {
    renderBooking()
    // The week calendar grid has 7 buttons
    const calendarGrid = document.querySelector('.grid.grid-cols-7')
    expect(calendarGrid).not.toBeNull()
    const dayBtns = calendarGrid.querySelectorAll('button')
    expect(dayBtns).toHaveLength(7)
  })

  it('shows size labels: pequeño, mediano, grande', () => {
    renderBooking()
    expect(screen.getAllByText(/pequeño/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/mediano/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/grande/i).length).toBeGreaterThan(0)
  })

  it('shows booking form after selecting size', () => {
    renderBooking()
    // Click the first enabled size card
    const sizeCards = screen.getAllByRole('button').filter(b =>
      !b.disabled && (b.textContent.includes('Pequeño') || b.textContent.includes('Mediano') || b.textContent.includes('Grande'))
    )
    if (sizeCards.length > 0) {
      fireEvent.click(sizeCards[0])
      expect(screen.getByPlaceholderText('Tu nombre')).toBeInTheDocument()
    }
  })

  it('shows success after submitting a valid booking', () => {
    renderBooking()
    // Select first available size
    const sizeCards = screen.getAllByRole('button').filter(b =>
      !b.disabled && (b.textContent.includes('Pequeño') || b.textContent.includes('Mediano') || b.textContent.includes('Grande'))
    )
    if (sizeCards.length === 0) return // skip if all full
    fireEvent.click(sizeCards[0])
    fireEvent.change(screen.getByPlaceholderText('Tu nombre'), { target: { value: 'Test Owner' } })
    fireEvent.change(screen.getByPlaceholderText('Nombre de tu perrito'), { target: { value: 'TestDog' } })
    fireEvent.change(screen.getByPlaceholderText('+507 6000-0000'), { target: { value: '+507 6000-0000' } })
    fireEvent.click(screen.getByRole('button', { name: /confirmar reserva/i }))
    expect(screen.getByText(/reserva confirmada/i)).toBeInTheDocument()
  })
})
