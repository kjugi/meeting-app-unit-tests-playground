import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import axios from 'axios'
// Check for more: https://github.com/kentor/flush-promises
// or if you don't want to add external lib: https://github.com/kentor/flush-promises/blob/master/index.js
import flushPromises from 'flush-promises'
import AddMeeting from '@/views/AddMeeting.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

// Check for more: https://jestjs.io/docs/en/mock-functions.html
// Alternative for mocking requests: https://github.com/ctimmerm/axios-mock-adapter
jest.mock('axios')
// Check for more: https://jestjs.io/docs/en/timer-mocks
jest.useFakeTimers()

describe('AddMeeting page', () => {
  beforeEach(() => {
  })

  // it('default form is rendered', () => {
  // })

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

  // it('min attribute in input date has today date', () => {
  // })

  // it('error is showed when form is invalid', () => {
  // })

  // it('button can be disable or enabled', () => {})

  // it('can add meeting to store', () => {
  // })

  // it('message is showed after button click and hide on @hideMessage event', () => {
  // })
})
