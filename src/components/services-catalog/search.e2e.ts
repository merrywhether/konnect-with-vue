import { test, expect } from '@playwright/test'

test.describe('Search', () => {
  test('filters results and reflects the query in the URL', async ({
    page,
  }) => {
    await page.goto('/')
    await page.getByRole('article').first().waitFor()

    await page.getByPlaceholder('Search').fill('REST')

    await expect(page).toHaveURL(/q=REST/, { timeout: 2000 })
  })

  test('clears the search query and restores the full listing', async ({
    page,
  }) => {
    await page.goto('/?q=REST')
    await page.getByRole('article').first().waitFor()

    await page.getByLabel('Clear search').click()

    await expect(page).not.toHaveURL(/q=/)
    await expect(page.getByRole('article').first()).toBeVisible()
    await expect(page.getByRole('status')).toHaveText(
      /1 to 12 of \d+ services/,
    )
  })

  test('shows the empty state when no results match the query', async ({
    page,
  }) => {
    await page.goto('/?q=xyzzy_no_match_guaranteed')
    await expect(page.getByAltText('No services found')).toBeVisible()
  })
})
