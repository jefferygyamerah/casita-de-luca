import { test, expect } from '@playwright/test'

test.describe('Admin page — passcode gate', () => {
  test.beforeEach(async ({ page }) => {
    // Clear sessionStorage before each test
    await page.goto('/admin', { waitUntil: 'commit' })
    await page.evaluate(() => sessionStorage.clear())
    await page.reload({ waitUntil: 'commit' })
  })

  test('shows passcode gate when not authenticated', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /panel admin/i })).toBeVisible()
    await expect(page.getByPlaceholder('••••••••')).toBeVisible()
  })

  test('wrong passcode shows error', async ({ page }) => {
    await page.getByPlaceholder('••••••••').fill('wrongcode')
    await page.getByRole('button', { name: /entrar/i }).click()
    await expect(page.getByText(/código incorrecto/i)).toBeVisible()
  })

  test('correct passcode unlocks the panel', async ({ page }) => {
    await page.getByPlaceholder('••••••••').fill('passcode')
    await page.getByRole('button', { name: /entrar/i }).click()
    await expect(page.getByRole('heading', { name: /administración/i })).toBeVisible()
  })

  test('show/hide toggle reveals passcode text', async ({ page }) => {
    const input = page.getByPlaceholder('••••••••')
    await input.fill('passcode')
    await expect(input).toHaveAttribute('type', 'password')

    // Click the eye toggle
    await page.locator('button[tabindex="-1"]').click()
    await expect(input).toHaveAttribute('type', 'text')
  })
})

test.describe('Admin panel — authenticated', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin', { waitUntil: 'commit' })
    await page.evaluate(() => sessionStorage.setItem('casita_admin_auth', '1'))
    await page.reload({ waitUntil: 'commit' })
  })

  test('shows all main sections', async ({ page }) => {
    await expect(page.getByText(/textos de la página/i)).toBeVisible()
    await expect(page.getByText(/capacidad global/i)).toBeVisible()
    await expect(page.getByText(/calendario/i)).toBeVisible()
    await expect(page.getByText(/huespedcitos/i)).toBeVisible()
    await expect(page.getByText(/galería/i)).toBeVisible()
  })

  test('content editor has editable fields', async ({ page }) => {
    await expect(page.getByLabel(/titular del hero/i)).toBeVisible()
    await expect(page.getByLabel(/subtítulo/i)).toBeVisible()
    await expect(page.getByLabel(/número de whatsapp/i)).toBeVisible()
  })

  test('saving content shows confirmation', async ({ page }) => {
    await page.getByLabel(/titular del hero/i).fill('Nuevo titular de prueba')
    await page.getByRole('button', { name: /guardar textos/i }).click()
    await expect(page.getByText(/guardado/i).first()).toBeVisible()
  })

  test('logout clears session and shows gate again', async ({ page }) => {
    await page.getByRole('button', { name: /salir/i }).click()
    await expect(page.getByPlaceholder('••••••••')).toBeVisible()
  })

  test('30-day calendar strip is rendered', async ({ page }) => {
    const calSection = page.getByText(/calendario — capacidad por día/i)
    await expect(calSection).toBeVisible()
    // Should have at least 28 day buttons in the strip
    const strip = calSection.locator('..').locator('button')
    await expect(strip).toHaveCountGreaterThan(27)
  })
})
