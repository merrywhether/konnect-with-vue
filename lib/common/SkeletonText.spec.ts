import { mount } from '@vue/test-utils'
import SkeletonText from './SkeletonText.vue'

describe('SkeletonText', () => {
  it('is hidden from assistive technology', () => {
    const wrapper = mount(SkeletonText)

    expect(wrapper.attributes('aria-hidden')).toBe('true')
  })
})
