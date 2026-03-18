import { mount } from '@vue/test-utils'
import SearchInput from './SearchInput.vue'

describe('SearchInput', () => {
  it('renders the value, shows the clear button, and emits clear on click', async () => {
    const wrapper = mount(SearchInput, { props: { modelValue: 'pong' } })
    const btn = wrapper.find('[aria-label="Clear search"]')

    expect((wrapper.find('input').element as HTMLInputElement).value).toBe(
      'pong',
    )
    expect(btn.attributes('tabindex')).toBe('0')

    await btn.trigger('click')
    expect(wrapper.emitted('clear')).toBeTruthy()
  })

  it('hides the clear button when the query is empty', () => {
    const wrapper = mount(SearchInput, { props: { modelValue: '' } })
    const btn = wrapper.find('[aria-label="Clear search"]')

    expect(btn.attributes('tabindex')).toBe('-1')
  })

  it('emits update:modelValue when the user types', async () => {
    const wrapper = mount(SearchInput, { props: { modelValue: '' } })

    await wrapper.find('input').setValue('pong')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['pong'])
  })
})
