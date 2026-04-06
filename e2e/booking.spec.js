import { test, expect } from '@playwright/test'

test.describe('Booking page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/reservar', { waitUntil: 'commit' })
  })

  test('renders page heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /reservar hospedaje/i })).toBeVisible()
  })

  test('shows a week calendar with 7 day buttons', async ({ page }) => {
    const dayButtons = page.locator('.grid.grid-cols-7 button')
    await expect(dayButtons).toHaveCount(7)
  })

  test('size cards are visible (small, medium, large)', async ({ page }) => {
    await expect(page.getByText(/pequeño/i).first()).toBeVisible()
    await expect(page.getByText(/mediano/i).first()).toBeVisible()
    await expect(page.getByText(/grande/i).first()).toBeVisible()
  })

  test('clicking a future date selects it', async ({ page }) => {
    const dayButtons = page.locator('.grid.grid-cols-7 button:not([disabled])')
    const firstAvailable = dayButtons.first()
    await firstAvailable.click()
    await expect(firstAvailable).toHaveClass(/bg-teal/)
  })

  test('booking form appears after selecting size', async ({ page }) => {
    // Click first enabled day
    const dayBtn = page.locator('.grid.grid-cols-7 button:not([disabled])').first()
    await dayBtn.click()

    // Click first non-full size card
    const sizeCard = page.locator('button[class*="border-2"]:not([disabled])').first()
    await sizeCard.click()

    await expect(page.getByLabel(/nombre del dueño/i)).toBeVisible()
    await expect(page.getByLabel(/nombre del perrito/i)).toBeVisible()
    await expect(page.getByLabel(/teléfono/i)).toBeVisible()
  })

  test('submitting booking form shows success message', async ({ page }) => {
    // Select day
    const dayBtn = page.locator('.grid.grid-cols-7 button:not([disabled])').first()
    await dayBtn.click()

    // Select size
    const sizeCard = page.locator('button[class*="border-2"]:not([disabled])').first()
    await sizeCard.click()

    // Fill form
    await page.getByLabel(/nombre del dueño/i).fill('Test Owner')
    await page.getByLabel(/nombre del perrito/i).fill('TestDog')
    await page.getByLabel(/teléfono/i).fill('+507 6000-0000')
    await page.getByRole('button', { name: /confirmar reserva/i }).click()

    await expect(page.getByText(/reserva confirmada/i)).toBeVisible()
  })
})
