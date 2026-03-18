import { test, expect } from '@playwright/experimental-ct-vue'
import type { Page } from '@playwright/test'
import BaseModal from './BaseModal.vue'

test.describe('BaseModal rendering', () => {
  test('shows the dialog when open and hides it when closed', async ({
    mount,
    page,
  }) => {
    const component = await mount(BaseModal, {
      props: { open: true, labelledBy: 'title' },
      slots: { default: '<p>Content</p>' },
    })

    await expect(page.getByRole('dialog')).toBeVisible()

    await component.update({ props: { open: false, labelledBy: 'title' } })

    await expect(page.getByRole('dialog')).not.toBeVisible()
  })
})

test.describe('BaseModal focus management', () => {
  test('moves focus to the first focusable element when opened', async ({
    mount,
    page,
  }) => {
    await mount(BaseModal, {
      props: { open: true, labelledBy: 'title' },
      slots: {
        default: `
          <button id="first">First</button>
          <button id="second">Second</button>
        `,
      },
    })

    await expect(page.locator('#first')).toBeFocused()
  })

  test('Tab cycles forward through all focusable elements and wraps around', async ({
    mount,
    page,
  }) => {
    await mount(BaseModal, {
      props: { open: true, labelledBy: 'title' },
      slots: {
        default: `
          <button id="a">A</button>
          <button id="b">B</button>
          <button id="c">C</button>
        `,
      },
    })

    await expect(page.locator('#a')).toBeFocused()
    await page.keyboard.press('Tab')
    await expect(page.locator('#b')).toBeFocused()
    await page.keyboard.press('Tab')
    await expect(page.locator('#c')).toBeFocused()
    await page.keyboard.press('Tab')
    await expect(page.locator('#a')).toBeFocused()
  })

  test('Shift+Tab cycles backward and wraps from first to last', async ({
    mount,
    page,
  }) => {
    await mount(BaseModal, {
      props: { open: true, labelledBy: 'title' },
      slots: {
        default: `
          <button id="x">X</button>
          <button id="y">Y</button>
        `,
      },
    })

    await expect(page.locator('#x')).toBeFocused()
    await page.keyboard.press('Shift+Tab')
    await expect(page.locator('#y')).toBeFocused()
  })

  test('does not crash and keeps the dialog accessible when there are no focusable elements', async ({
    mount,
    page,
  }) => {
    await mount(BaseModal, {
      props: { open: true, labelledBy: 'title' },
      slots: { default: '<p>No interactive elements here</p>' },
    })

    await expect(page.getByRole('dialog')).toBeVisible()
  })
})

test.describe('BaseModal interactions', () => {
  test('Escape emits close', async ({ mount, page }) => {
    let closeCalled = false

    await mount(BaseModal, {
      props: { open: true, labelledBy: 'title' },
      slots: { default: '<button>OK</button>' },
      on: {
        close: () => {
          closeCalled = true
        },
      },
    })

    await page.keyboard.press('Escape')

    expect(closeCalled).toBe(true)
  })

  test('clicking the backdrop emits close', async ({ mount, page }) => {
    let closeCalled = false

    await mount(BaseModal, {
      props: { open: true, labelledBy: 'title' },
      slots: { default: '<button>OK</button>' },
      on: {
        close: () => {
          closeCalled = true
        },
      },
    })

    await page.mouse.click(10, 10)

    expect(closeCalled).toBe(true)
  })
})

// Dispatch a vertical swipe gesture directly via TouchEvents in the browser.
async function simulateSwipe(page: Page, selector: string, deltaY: number) {
  await page.evaluate(
    ({ selector, deltaY }: { selector: string, deltaY: number }) => {
      const el = document.querySelector(selector)
      if (!el) throw new Error(`Element not found: ${selector}`)

      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const y0 = rect.top + 10 // slightly inside the top of the element

      const makeTouch = (dy: number) =>
        new Touch({ identifier: 1, target: el, clientX: cx, clientY: y0 + dy })

      el.dispatchEvent(
        new TouchEvent('touchstart', {
          touches: [makeTouch(0)],
          changedTouches: [makeTouch(0)],
          bubbles: true,
          cancelable: true,
        }),
      )
      el.dispatchEvent(
        new TouchEvent('touchmove', {
          touches: [makeTouch(Math.round(deltaY / 2))],
          changedTouches: [makeTouch(Math.round(deltaY / 2))],
          bubbles: true,
          cancelable: true,
        }),
      )
      el.dispatchEvent(
        new TouchEvent('touchmove', {
          touches: [makeTouch(deltaY)],
          changedTouches: [makeTouch(deltaY)],
          bubbles: true,
          cancelable: true,
        }),
      )
      el.dispatchEvent(
        new TouchEvent('touchend', {
          touches: [],
          changedTouches: [makeTouch(deltaY)],
          bubbles: true,
          cancelable: true,
        }),
      )
    },
    { selector, deltaY },
  )
}

test.describe('useSwipeToDismiss (mobile bottom sheet)', () => {
  test.use({ viewport: { width: 375, height: 667 } })

  test('a large downward swipe (past 30% of viewport) triggers dismissal', async ({
    mount,
    page,
  }) => {
    let closeCalled = false

    await mount(BaseModal, {
      props: { open: true, labelledBy: 'title' },
      slots: { default: '<p>Swipe me</p>' },
      on: {
        close: () => {
          closeCalled = true
        },
      },
    })

    await simulateSwipe(page, '.modal-content', 250)
    await page.waitForTimeout(150)

    expect(closeCalled).toBe(true)
  })

  test('a short downward swipe (below threshold and flick minimum) does not dismiss', async ({
    mount,
    page,
  }) => {
    let closeCalled = false

    await mount(BaseModal, {
      props: { open: true, labelledBy: 'title' },
      slots: { default: '<p>Swipe me</p>' },
      on: {
        close: () => {
          closeCalled = true
        },
      },
    })

    await simulateSwipe(page, '.modal-content', 30)
    await page.waitForTimeout(150)

    expect(closeCalled).toBe(false)
    await expect(page.getByRole('dialog')).toBeVisible()
  })
})
