import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'commit' })
  })

  test('renders hero section with headline and CTA buttons', async ({ page }) => {
    const hero = page.locator('section').first()
    await expect(hero).toBeVisible()
    await expect(page.getByRole('link', { name: /reservar/i }).first()).toBeVisible()
  })

  test('navigation bar is visible with correct links', async ({ page }) => {
    const nav = page.locator('nav')
    await expect(nav).toBeVisible()
    await expect(page.getByRole('link', { name: /inicio/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /reservar/i }).first()).toBeVisible()
  })

  test('page title is set', async ({ page }) => {
    await expect(page).toHaveTitle(/.+/)
  })

  test('no React error overlay visible', async ({ page }) => {
    const errorOverlay = page.locator('vite-error-overlay, #webpack-dev-server-client-overlay')
    await expect(errorOverlay).toHaveCount(0)
  })
})
