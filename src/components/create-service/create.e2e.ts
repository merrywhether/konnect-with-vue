import { test, expect } from '@playwright/test'

test.describe('Create service', () => {
  test('submitting the form navigates to the new service detail view', async ({
    page,
  }) => {
    await page.goto('/')
    await page.getByRole('article').first().waitFor()

    await page.getByRole('button', { name: /Service Package/i }).click()

    const createDialog = page.getByRole('dialog')
    await expect(createDialog).toBeVisible()
    await expect(createDialog.getByRole('heading', { level: 2 })).toHaveText(
      'Create Service Package',
    )

    await page.getByPlaceholder('Enter service name').fill('E2E Test Service')
    await page.getByRole('button', { name: 'Create' }).click()

    await expect(page).toHaveURL(/\/services\//, { timeout: 5000 })
    await expect(
      page.getByRole('dialog').getByRole('heading', { level: 2 }),
    ).toHaveText('E2E Test Service')
  })

  test('shows a validation error and does not submit when name is empty', async ({
    page,
  }) => {
    await page.goto('/')
    await page.getByRole('article').first().waitFor()

    await page.getByRole('button', { name: /Service Package/i }).click()
    await expect(page.getByRole('dialog')).toBeVisible()

    await page.getByRole('button', { name: 'Create' }).click()

    await expect(page.getByRole('dialog')).toBeVisible()
    await expect(page).not.toHaveURL(/\/services\//)
  })

  test('Cancel button closes the dialog without navigating', async ({
    page,
  }) => {
    await page.goto('/')
    await page.getByRole('article').first().waitFor()

    await page.getByRole('button', { name: /Service Package/i }).click()
    await expect(page.getByRole('dialog')).toBeVisible()

    await page.getByRole('button', { name: 'Cancel' }).click()

    await expect(page.getByRole('dialog')).not.toBeVisible()
    await expect(page).not.toHaveURL(/\/services\//)
  })
})
