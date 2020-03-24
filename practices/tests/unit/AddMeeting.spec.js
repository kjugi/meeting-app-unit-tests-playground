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
    expect(wrapper.find('#start').exists()).toBe(true)
    expect(wrapper.find('#all-day').exists()).toBe(true)
    expect(wrapper.find('.add-meeting__button').exists()).toBe(true)
    expect(wrapper.find('.add-meeting__error').exists()).toBe(true)
  })

  // it('has loading class when form is blocked', () => {
  // })

  // it('predefined addreses are available', () => {
  // })

  // it('predefined select change value to selected option', () => {
  // })

  // it('predefined checkbox toggle fields and clear values', () => {
  // })

  // it('can set custom meeting start in form', () => {
  // })

  it('min attribute in input date has today date', async () => {
    const wrapper = mount(AddMeeting)
    const todayDateFormat = new Date().toJSON().slice(0, 10)
    await flushPromises()

    expect(wrapper.find('#start').attributes().min).toBe(todayDateFormat)
  })

  // it('all day checkbox toggle input on field and clear selectedHour', () => {
  // })

  // it('error is showed when form is invalid', () => {
  // })

  // it('button can be disable or enabled', () => {})

  // it('can add meeting to store', () => {
  // })

  // it('message is showed after button click and hide on @hideMessage event', () => {
  // })
})
