import { mount } from '@vue/test-utils'
import PaginationControls from './PaginationControls.vue'

function mountPagination(props: {
  total: number
  page: number
  pageSize: number
}) {
  return mount(PaginationControls, { props })
}

function prev(wrapper: ReturnType<typeof mount>) {
  return wrapper.find('button[aria-label="Previous page"]')
}

function next(wrapper: ReturnType<typeof mount>) {
  return wrapper.find('button[aria-label="Next page"]')
}

describe('PaginationControls', () => {
  it('shows the correct item range for the current page', () => {
    const w1 = mountPagination({ total: 30, page: 1, pageSize: 12 })
    expect(w1.find('[role="status"]').text()).toBe('1 to 12 of 30 services')

    const w2 = mountPagination({ total: 30, page: 2, pageSize: 12 })
    expect(w2.find('[role="status"]').text()).toBe('13 to 24 of 30 services')
  })

  it('clamps rangeEnd to total on a partial last page', () => {
    const wrapper = mountPagination({ total: 30, page: 3, pageSize: 12 })
    expect(wrapper.find('[role="status"]').text()).toBe(
      '25 to 30 of 30 services',
    )
  })

  // Navigation emits are covered by pagination.e2e.ts; these tests cover
  // edge cases the E2E cannot hit with the server's random 50–150 service data.

  it('disables previous on the first page and enables it on subsequent pages', () => {
    const first = mountPagination({ total: 30, page: 1, pageSize: 12 })
    expect(prev(first).attributes('disabled')).toBeDefined()
    expect(next(first).attributes('disabled')).toBeUndefined()

    const second = mountPagination({ total: 30, page: 2, pageSize: 12 })
    expect(prev(second).attributes('disabled')).toBeUndefined()
  })

  it('disables next on the last page and enables it on earlier pages', () => {
    const last = mountPagination({ total: 30, page: 3, pageSize: 12 })
    expect(next(last).attributes('disabled')).toBeDefined()
    expect(prev(last).attributes('disabled')).toBeUndefined()

    const middle = mountPagination({ total: 30, page: 2, pageSize: 12 })
    expect(next(middle).attributes('disabled')).toBeUndefined()
  })

  it('disables both buttons when there is only one page', () => {
    const wrapper = mountPagination({ total: 5, page: 1, pageSize: 12 })
    expect(prev(wrapper).attributes('disabled')).toBeDefined()
    expect(next(wrapper).attributes('disabled')).toBeDefined()
  })
})
