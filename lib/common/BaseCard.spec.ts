import { mount } from '@vue/test-utils'
import BaseCard from './BaseCard.vue'

describe('BaseCard', () => {
  it('renders all slots and applies interactive class', () => {
    const wrapper = mount(BaseCard, {
      props: { interactive: true },
      slots: { header: '<span>Header</span>', default: '<p>Body content</p>', footer: '<span>Footer</span>' },
    })

    expect(wrapper.html()).toContain('Header')
    expect(wrapper.html()).toContain('Body content')
    expect(wrapper.html()).toContain('Footer')
    expect(wrapper.classes()).toContain('interactive')
  })

  it('omits the footer element when the footer slot is not provided', () => {
    const wrapper = mount(BaseCard)

    expect(wrapper.find('.card-footer').exists()).toBe(false)
  })

  it('is not interactive by default', () => {
    const wrapper = mount(BaseCard)

    expect(wrapper.classes()).not.toContain('interactive')
  })
})
