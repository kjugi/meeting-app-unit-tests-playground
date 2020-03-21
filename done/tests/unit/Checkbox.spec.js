import { mount } from '@vue/test-utils'
import Checkbox from '@/components/Checkbox.vue'

describe('Checkbox.vue', () => {
  it('emit events when trigger change on checkbox', () => {
    const wrapper = mount(Checkbox, {
      propsData: {
        id: 'checkbox1',
        label: 'label prop',
        value: false
      }
    })

    expect(wrapper.vm.localValue).toBe(wrapper.props().value)

    wrapper.find('#checkbox1').trigger('change')

    expect(wrapper.emitted('change')).toBeDefined()
    expect(wrapper.emitted('change').length).toBe(1)
    expect(wrapper.emitted('change')[0]).toEqual([])
    expect(wrapper.emitted('input')).toBeDefined()
    expect(wrapper.emitted('input').length).toBe(1)
    expect(wrapper.emitted('input')[0][0]).toEqual(false)
    expect(wrapper.vm.localValue).not.toBe(!wrapper.props().value)
  })
})
