import { mount } from '@vue/test-utils'
import TypeFlag from './TypeFlag.vue'

describe('TypeFlag', () => {
  it('always renders both HTTP and REST labels regardless of active type', () => {
    const http = mount(TypeFlag, { props: { type: 'HTTP' } })
    expect(http.text()).toContain('HTTP')
    expect(http.text()).toContain('REST')

    const rest = mount(TypeFlag, { props: { type: 'REST' } })
    expect(rest.text()).toContain('HTTP')
    expect(rest.text()).toContain('REST')
  })
})
