import { mount } from '@vue/test-utils'
import Message from '@/components/Message.vue'

describe('Message.vue', () => {
  it('renders prop title when passed', () => {
    const wrapper = mount(Message, {
      propsData: {
        title: 'test title'
      }
    })

    expect(wrapper.find('h2').text()).toMatch('test title')
  })

  // it('emit event when isMessageShowed updates', () => {})
})
