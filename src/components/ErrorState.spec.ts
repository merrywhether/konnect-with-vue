import { mount } from '@vue/test-utils'
import ErrorState from './ErrorState.vue'

describe('ErrorState', () => {
  it('renders default title and subtitle, and emits retry on button click', async () => {
    const wrapper = mount(ErrorState)

    expect(wrapper.text()).toContain('Something went wrong')
    expect(wrapper.text()).toContain('Our wizards are already conjuring up a fix')

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('retry')).toHaveLength(1)
  })

  it('renders custom title and subtitle when provided', () => {
    const wrapper = mount(ErrorState, {
      props: { title: 'Service unavailable', subtitle: 'Please try again later.' },
    })

    expect(wrapper.text()).toContain('Service unavailable')
    expect(wrapper.text()).toContain('Please try again later.')
    expect(wrapper.text()).not.toContain('Something went wrong')
  })
})
