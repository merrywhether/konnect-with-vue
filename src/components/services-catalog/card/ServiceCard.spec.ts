import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import type { Service } from '#types'
import ServiceCard from './ServiceCard.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: {} },
    { path: '/services/:id', component: {} },
  ],
})

function makeService(overrides: Partial<Service> = {}): Service {
  return {
    id: 's1',
    name: 'My Service',
    description: 'A service',
    type: 'REST',
    published: false,
    configured: false,
    versions: [],
    ...overrides,
  }
}

describe('ServiceCard', () => {
  it('deduplicates developers across versions so each contributor appears only once', () => {
    const alice = {
      id: 'a',
      name: 'Alice A',
      email: 'alice@test.com',
      avatar: 'https://example.com/alice.png',
    }
    const bob = {
      id: 'b',
      name: 'Bob B',
      email: 'bob@test.com',
      avatar: 'https://example.com/bob.png',
    }

    const service = makeService({
      versions: [
        {
          id: 'v1',
          name: 'v1',
          description: '',
          updated_at: new Date().toISOString(),
          developer: alice,
        },
        {
          id: 'v2',
          name: 'v2',
          description: '',
          updated_at: new Date().toISOString(),
          developer: alice,
        },
        {
          id: 'v3',
          name: 'v3',
          description: '',
          updated_at: new Date().toISOString(),
          developer: bob,
        },
      ],
    })

    const wrapper = mount(ServiceCard, {
      props: { service },
      global: { plugins: [router] },
    })

    expect(wrapper.findAll('img[alt]').length).toBe(2)
    const alts = wrapper
      .findAll('img[alt]')
      .map((img) => img.attributes('alt'))
    expect(alts).toContain('Alice A')
    expect(alts).toContain('Bob B')
  })
})
