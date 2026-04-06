import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AdminPage from '../pages/AdminPage'

function renderAdmin() {
  return render(<MemoryRouter><AdminPage /></MemoryRouter>)
}

beforeEach(() => {
  localStorage.clear()
  sessionStorage.clear()
})

describe('Passcode gate', () => {
  it('shows passcode gate by default', () => {
    renderAdmin()
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument()
  })

  it('shows error on wrong passcode', () => {
    renderAdmin()
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: 'wrong' } })
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }))
    expect(screen.getByText(/código incorrecto/i)).toBeInTheDocument()
  })

  it('unlocks panel on correct passcode', () => {
    renderAdmin()
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: 'passcode' } })
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }))
    expect(screen.getByRole('heading', { name: /administración/i })).toBeInTheDocument()
  })

  it('shows gate if sessionStorage lacks auth', () => {
    sessionStorage.removeItem('casita_admin_auth')
    renderAdmin()
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument()
  })

  it('skips gate if sessionStorage has auth', () => {
    sessionStorage.setItem('casita_admin_auth', '1')
    renderAdmin()
    expect(screen.queryByPlaceholderText('••••••••')).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /administración/i })).toBeInTheDocument()
  })
})

describe('Admin panel sections (authenticated)', () => {
  beforeEach(() => {
    sessionStorage.setItem('casita_admin_auth', '1')
  })

  it('renders content editor section', () => {
    renderAdmin()
    expect(screen.getByText(/textos de la página/i)).toBeInTheDocument()
    expect(screen.getByText(/titular del hero/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/un hogar lleno de amor/i)).toBeInTheDocument()
  })

  it('renders global capacity section', () => {
    renderAdmin()
    expect(screen.getByText(/capacidad global/i)).toBeInTheDocument()
  })

  it('renders calendar section', () => {
    renderAdmin()
    expect(screen.getByText(/calendario/i)).toBeInTheDocument()
  })

  it('renders huespedcitos section', () => {
    renderAdmin()
    expect(screen.getAllByText(/huespedcitos/i).length).toBeGreaterThan(0)
  })

  it('renders gallery section', () => {
    renderAdmin()
    expect(screen.getByText(/galería de fotos/i)).toBeInTheDocument()
  })

  it('logout button clears session and shows gate', () => {
    renderAdmin()
    fireEvent.click(screen.getByRole('button', { name: /salir/i }))
    expect(sessionStorage.getItem('casita_admin_auth')).toBeNull()
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument()
  })
})
