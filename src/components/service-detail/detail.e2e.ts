import { test, expect } from '@playwright/test'

test.describe('Service detail', () => {
  test('clicking a card opens the detail dialog with the correct service name', async ({ page }) => {
    await page.goto('/')
    const firstCard = page.getByRole('article').first()
    await firstCard.waitFor()

    const cardTitle = await firstCard.getByRole('heading').textContent()

    await firstCard.click()

    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole('heading', { level: 2 })).toHaveText(cardTitle!.trim())
    await expect(page).toHaveURL(/\/services\//)
  })

  test('Escape closes the detail dialog and restores the catalog URL', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('article').first().waitFor()
    await page.getByRole('article').first().click()
    await expect(page.getByRole('dialog')).toBeVisible()

    await page.keyboard.press('Escape')

    await expect(page.getByRole('dialog')).not.toBeVisible()
    await expect(page).not.toHaveURL(/\/services\//)
  })

  test('preserves the search query when opening and closing the detail view', async ({ page }) => {
    await page.goto('/?q=REST')
    await page.getByRole('article').first().waitFor()
    await page.getByRole('article').first().click()
    await expect(page).toHaveURL(/\/services\/.*q=REST/)

    await page.keyboard.press('Escape')
    await expect(page).toHaveURL(/q=REST/)
    await expect(page).not.toHaveURL(/\/services\//)
  })
})
