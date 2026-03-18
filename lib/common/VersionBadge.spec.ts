import { mount } from '@vue/test-utils'
import VersionBadge from './VersionBadge.vue'

describe('VersionBadge', () => {
  it('renders nothing when count is 0', () => {
    const wrapper = mount(VersionBadge, { props: { count: 0 } })

    expect(wrapper.text()).toBe('')
  })

  it('renders "1 version" singular', () => {
    const wrapper = mount(VersionBadge, { props: { count: 1 } })

    expect(wrapper.text()).toBe('1 version')
  })

  it('renders plural for count > 1', () => {
    const wrapper = mount(VersionBadge, { props: { count: 3 } })

    expect(wrapper.text()).toBe('3 versions')
  })
})
