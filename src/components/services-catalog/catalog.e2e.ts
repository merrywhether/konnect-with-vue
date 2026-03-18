import { test, expect } from '@playwright/test'

test.describe('Service catalog', () => {
  test('shows the page heading, a full card grid, and paginated totals', async ({
    page,
  }) => {
    await page.goto('/')

    await expect(
      page.getByRole('heading', { name: 'Service Hub' }),
    ).toBeVisible()

    const firstCard = page.getByRole('article').first()
    await firstCard.waitFor()
    expect(await page.getByRole('article').count()).toBeGreaterThan(0)

    await expect(page.getByRole('status')).toHaveText(
      /1 to 12 of \d+ services/,
    )
  })
})
