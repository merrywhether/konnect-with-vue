import { test, expect } from '@playwright/test'

test.describe('Pagination', () => {
  test('next and previous buttons update the page info text and the URL', async ({
    page,
  }) => {
    await page.goto('/')
    await page.getByRole('article').first().waitFor()

    await expect(page.getByRole('status')).toHaveText(
      /1 to 12 of \d+ services/,
    )
    await expect(
      page.getByRole('button', { name: 'Previous page' }),
    ).toBeDisabled()

    await page.getByRole('button', { name: 'Next page' }).click()

    await expect(page).toHaveURL(/page=2/)
    await expect(page.getByRole('status')).toHaveText(
      /13 to 24 of \d+ services/,
    )
    await expect(
      page.getByRole('button', { name: 'Previous page' }),
    ).toBeEnabled()

    await page.getByRole('button', { name: 'Previous page' }).click()

    await expect(page).not.toHaveURL(/page=/)
    await expect(page.getByRole('status')).toHaveText(
      /1 to 12 of \d+ services/,
    )
    await expect(
      page.getByRole('button', { name: 'Previous page' }),
    ).toBeDisabled()
  })

  test('loading a page=2 URL directly shows the correct range', async ({
    page,
  }) => {
    await page.goto('/?page=2')
    await page.getByRole('article').first().waitFor()
    await expect(page.getByRole('status')).toHaveText(
      /13 to 24 of \d+ services/,
    )
  })
})
