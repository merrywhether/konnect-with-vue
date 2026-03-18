import { mount } from '@vue/test-utils'
import type { Version } from '#types'
import VersionRow from './VersionRow.vue'

function version(name: string): Version {
  return {
    id: 'v1',
    name: 'v1.0',
    description: 'A version',
    updated_at: new Date().toISOString(),
    developer: {
      id: 'd1',
      name,
      email: 'dev@test.com',
      avatar: 'https://example.com/avatar.png',
    },
  }
}

describe('VersionRow', () => {
  it('abbreviates multi-word developer names and leaves single-word names intact', () => {
    const multi = mount(VersionRow, {
      props: { version: version('Jane Doe Smith'), serviceType: 'REST' },
    })
    expect(multi.text()).toContain('Jane S.')

    const single = mount(VersionRow, {
      props: { version: version('Cher'), serviceType: 'REST' },
    })
    expect(single.text()).toContain('Cher')
  })
})
