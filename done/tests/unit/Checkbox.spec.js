import { mount } from '@vue/test-utils'
import Checkbox from '@/components/Checkbox.vue'

const factory = () => {
  return mount(Checkbox, {
    propsData: {
      id: 'checkbox1',
      label: 'label prop',
      value: false
    }
  })
}

describe('Checkbox.vue', () => {
  it('emit events when change checked value', () => {
    const wrapper = factory()

    wrapper.find('#checkbox1').setChecked()

    expect(wrapper.emitted('change')).toBeDefined()
    expect(wrapper.emitted('change').length).toBe(1)
    expect(wrapper.emitted('change')[0]).toEqual([])
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0][0]).toEqual(true)
  })

  it('default component matches snapshot', () => {
    const wrapper = factory()

    expect(wrapper).toMatchSnapshot()
  })
})
