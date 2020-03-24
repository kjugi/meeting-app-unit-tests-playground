import { mount } from '@vue/test-utils'
import Message from '@/components/Message.vue'

// Check for more: https://jestjs.io/docs/en/timer-mocks
jest.useFakeTimers()

describe('Message.vue', () => {
  it('renders prop title when passed', () => {
    const wrapper = mount(Message, {
      propsData: {
        title: 'test title',
        isMessageShowed: false
      }
    })

    expect(wrapper.find('h2').text()).toMatch('test title')
  })

  it('emit event when isMessageShowed updates', async () => {
    const wrapper = mount(Message, {
      propsData: {
        title: 'test title',
        isMessageShowed: false
      }
    })

    expect(wrapper.emitted()).toEqual({})
    expect(wrapper.emitted()).toEqual(expect.not.objectContaining({ hideMessage: [[]] }))

    await wrapper.setProps({ isMessageShowed: true })
    jest.runAllTimers()

    expect(wrapper.emitted('hideMessage')).toBeDefined()
    expect(wrapper.emitted('hideMessage').length).toBe(1)
    expect(wrapper.emitted('hideMessage')[0]).toEqual([])
  })
})
