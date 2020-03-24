import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import axios from 'axios'
// Check for more: https://github.com/ctimmerm/axios-mock-adapter#axios-mock-adapter
import MockArapter from 'axios-mock-adapter'
// Check for more: https://github.com/kentor/flush-promises
// or if you don't want to add external lib: https://github.com/kentor/flush-promises/blob/master/index.js
import flushPromises from 'flush-promises'
import AddMeeting from '@/views/AddMeeting.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

// Check for more: https://jestjs.io/docs/en/timer-mocks
jest.useFakeTimers()

describe('AddMeeting page', () => {
  beforeEach(() => {
  })

  it('default form is rendered', () => {
    const wrapper = mount(AddMeeting)

    expect(wrapper.classes()).toStrictEqual([
      'add-meeting',
      'add-meeting--loading'
    ])
    expect(wrapper.find('#email').exists()).toBe(true)
    expect(wrapper.find('#predefined').exists()).toBe(true)
    expect(wrapper.find({ ref: 'meetingDate' }).exists()).toBe(true)
    expect(wrapper.find('.add-meeting__button').exists()).toBe(true)
    expect(wrapper.find('.add-meeting__error').exists()).toBe(true)
  })

  // it('has loading class when form is blocked', () => {
  // })

  // it('predefined addreses are available', () => {
  // })

  // it('predefined select change value to selected option', () => {
  // })

  it('predefined checkbox toggle fields and clear values', async () => {
    const wrapper = mount(AddMeeting)
    await flushPromises()

    expect(wrapper.vm.predefined).toBe(true)

    await wrapper.find('#predefined').setChecked(false)

    expect(wrapper.vm.predefined).toBe(false)

    wrapper.find('#email').setValue('example value')

    expect(wrapper.vm.email).toBe('example value')

    await wrapper.find('#predefined').setChecked(true)

    expect(wrapper.vm.email).toBe('')
    expect(wrapper.find('#email').exists()).toBe(true)
  })

  // it('can set custom meeting start in form', () => {
  // })

  it('min attribute in input date has today date', async () => {
    const wrapper = mount(AddMeeting)
    const todayDateFormat = new Date().toJSON().slice(0, 10)
    await flushPromises()

    expect(wrapper.find('#meetingDate').attributes().min).toBe(todayDateFormat)
  })

  it('error is showed when form is invalid', async () => {
    const wrapper = mount(AddMeeting)

    expect(wrapper.vm.isFormValid).toBe(false)
    expect(wrapper.find('.add-meeting__error').exists()).toBe(true)

    await wrapper.setData({
      email: 'test',
      meetingDate: '2020-12-12'
    })

    expect(wrapper.vm.isFormValid).toBe(true)
    expect(wrapper.find('.add-meeting__error').exists()).toBe(false)
  })

  // it('button can be disable or enabled', () => {})

  // it('can add meeting to store', () => {
  // })

  // it('message is showed after button click and hide on @hideMessage event', () => {
  // })
})
