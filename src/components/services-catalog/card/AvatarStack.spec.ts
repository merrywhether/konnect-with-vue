import { mount } from '@vue/test-utils'
import type { Developer } from '#types'
import AvatarStack from './AvatarStack.vue'

function dev(id: string, name: string): Developer {
  return {
    id,
    name,
    email: `${id}@test.com`,
    avatar: `https://example.com/${id}.png`,
  }
}

describe('AvatarStack', () => {
  it('shows up to max visible avatars and an overflow badge for the rest', () => {
    const wrapper = mount(AvatarStack, {
      props: {
        developers: [
          dev('1', 'Alice'),
          dev('2', 'Bob'),
          dev('3', 'Carol'),
          dev('4', 'Dan'),
        ],
      },
    })

    expect(wrapper.findAll('img').length).toBe(2)
    expect(wrapper.find('[aria-label="2 more developers"]').exists()).toBe(
      true,
    )
  })

  it('hides the overflow badge when all developers fit within max', () => {
    const wrapper = mount(AvatarStack, {
      props: { developers: [dev('1', 'Alice'), dev('2', 'Bob')] },
    })

    expect(wrapper.findAll('img').length).toBe(2)
    expect(wrapper.find('[aria-label]').exists()).toBe(false)
  })
})
