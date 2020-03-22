import { mount } from '@vue/test-utils'
import AddMeeting from '@/views/AddMeeting.vue'

describe('AddMeeting page', () => {
  it('default form is rendered', () => {
    const wrapper = mount(AddMeeting)

    expect(wrapper.classes()).toStrictEqual([
      'add-meeting',
      'add-meeting--loading'
    ])
    expect(wrapper.find('#email').exists()).toBe(true)
    expect(wrapper.find('#predefined').exists()).toBe(true)
    expect(wrapper.find('#start').exists()).toBe(true)
    expect(wrapper.find('#all-day').exists()).toBe(true)
    expect(wrapper.find('.add-meeting__button').exists()).toBe(true)
    expect(wrapper.find('.add-meeting__error').exists()).toBe(true)
  })

  // it('has loading class when form is blocked', () => {})

  // it('predefined addreses are available', () => {})

  // it('predefined select emit @input when change value', () => {})

  // it('predefined checkbox emit @input, toggle fields and clear values', () => {})

  // it('can set custom meeting start in form', () => {})

  // it('min attribute in input date has today date', () => {})

  // it('all day checkbox toggle input on field and clear selectedHour', () => {})

  // it('can select custom hour value in form', () => {})

  // it('error is showed when form is invalid', () => {})

  // it('button can be disable or enabled', () => {})

  // it('button emit event with @addEvent', () => {})

  // it('message is showed after button click and hide on @hideMessage event', () => {})

  // it('can add meeting to store', () => {})
})
