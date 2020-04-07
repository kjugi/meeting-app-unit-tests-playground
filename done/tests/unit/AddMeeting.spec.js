import { mount, createLocalVue } from '@vue/test-utils'
import snapshotDiff from 'snapshot-diff'
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

const factory = (options = {}) => {
  return mount(AddMeeting, {...options})
}

const createStore = (actions = {}) => {
  return new Vuex.Store({
    state: {},
    actions
  })
}

describe('AddMeeting page', () => {
  let present
  let next

  beforeEach(() => {
    const response = {
      data: [
        {
          text: 'test',
          value: 'example@o2.pl'
        },
        {
          text: 'Example Person1',
          value: 'meeting1@gmail.com'
        },
        {
          text: 'Example Person2',
          value: 'meeting2@gmail.com'
        }
      ]
    }
    // Check for more: https://jestjs.io/docs/en/mock-function-api.html
    // Auto clearMock: https://jestjs.io/docs/en/configuration.html#clearmocks-boolean
    axios.get.mockClear()
    axios.post.mockClear()
    // Resolving /users endpoint
    axios.get.mockResolvedValue(response)
  })

  it('default form is rendered', () => {
    const wrapper = factory()

    expect(wrapper.classes()).toStrictEqual([
      'add-meeting',
      'add-meeting--loading'
    ])
    expect(wrapper.find('#email').exists()).toBe(true)
    expect(wrapper.find('#predefined').exists()).toBe(true)
    expect(wrapper.find({ ref: 'meetingDate' }).exists()).toBe(true)
    expect(wrapper.find('.add-meeting__button').exists()).toBe(true)
    expect(wrapper.find('.add-meeting__error').exists()).toBe(true)
    expect(wrapper).toMatchSnapshot()
  })

  it('has loading class when form is blocked', async () => {
    const wrapper = factory()

    present = wrapper.html()

    expect(wrapper.vm.isFormBlocked).toBe(true)
    expect(wrapper.classes('add-meeting--loading')).toBe(true)
    expect(present).toMatchSnapshot()

    await flushPromises()
    wrapper.setData({ isFormBlocked: false })
    next = wrapper.html()

    expect(wrapper.vm.isFormBlocked).toBe(false)
    expect(wrapper.classes('add-meeting--loading')).toBe(false)
    expect(snapshotDiff(present, next)).toMatchSnapshot()
  })

  it('predefined addreses are available', async () => {
    // TODO: Rethink acceptance tests here
    const wrapper = factory()

    expect(wrapper.vm.options).toBeNull()

    await flushPromises()

    expect(axios.get).toHaveBeenCalledWith('http://localhost:5679/users')
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.isMessageShowed).toBe(false)
    expect(wrapper.vm.messageTitle).toBe('')
    expect(wrapper.vm.options.length).toBe(3)
    expect(wrapper.findAll('#email option').length).toBe(4)
  })

  it('predefined select change value to selected option', async () => {
    const wrapper = factory()
    await flushPromises()

    expect(wrapper.vm.selectedPerson).toBe('')

    wrapper.findAll('#email option').at(2).setSelected()

    expect(wrapper.vm.selectedPerson).toBe('Example Person1')
  })

  it('predefined checkbox toggle fields and clear values', async () => {
    // TODO: Rethink acceptance tests here
    const wrapper = factory()
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

  it('can set custom meeting day in form', async () => {
    // TODO: Rethink acceptance tests here
    const wrapper = factory()
    const todayDateFormat = new Date().toJSON().slice(0, 10)
    await flushPromises()

    expect(wrapper.vm.meetingDate).toBe('')

    wrapper.find('#meetingDate').setValue(todayDateFormat)

    expect(wrapper.find('#meetingDate').element.value).toBe(todayDateFormat)
    expect(wrapper.vm.meetingDate).toBe(todayDateFormat)
  })

  it('min attribute in input date has today date', async () => {
    const wrapper = factory()
    const todayDateFormat = new Date().toJSON().slice(0, 10)
    await flushPromises()

    expect(wrapper.find('#meetingDate').attributes().min).toBe(todayDateFormat)
  })

  it('error is showed when form is invalid', async () => {
    // TODO: Rethink acceptance tests here
    const wrapper = factory()

    expect(wrapper.vm.isFormValid).toBe(false)
    expect(wrapper.find('.add-meeting__error').exists()).toBe(true)

    await wrapper.setData({
      email: 'test',
      meetingDate: '2020-12-12'
    })

    expect(wrapper.vm.isFormValid).toBe(true)
    expect(wrapper.find('.add-meeting__error').exists()).toBe(false)
  })

  it('button can be disable or enabled', async () => {
    // TODO: Rethink acceptance tests here
    const wrapper = factory()
    await flushPromises()

    expect(wrapper.vm.isFormValid).toBe(false)
    expect(wrapper.vm.isFormBlocked).toBe(false)
    expect(wrapper.find('.add-meeting__button').attributes().disabled).toBe('disabled')

    await wrapper.setData({
      email: 'test',
      meetingDate: '2020-12-12'
    })

    expect(wrapper.vm.isFormValid).toBe(true)
    expect(wrapper.find('.add-meeting__button').attributes().disabled).toBeUndefined()
  })

  it('can add meeting to store', async () => {
    const actions = {
      doReservation: jest.fn()
    }
    const localStore = createStore(actions)
    const wrapper = factory({ store: localStore, localVue })
    present = wrapper.html()

    expect(present).toMatchSnapshot()

    await flushPromises()
    await wrapper.setData({
      predefined: false,
      email: 'test',
      meetingDate: '2020-12-12'
    })
    next = wrapper.html()

    expect(snapshotDiff(present, next)).toMatchSnapshot()

    wrapper.find('.add-meeting__button').trigger('click')

    expect(wrapper.vm.isFormBlocked).toBe(true)

    present = next
    await flushPromises()
    next = wrapper.html()

    expect(axios.post).toHaveBeenCalledWith('http://localhost:5679/add', {
      who: 'test',
      date: '2020-12-12'
    })
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(actions.doReservation).toHaveBeenCalled()
    expect(wrapper.vm.isFormBlocked).toBe(false)
    expect(wrapper.vm.email).toBe('')
    expect(wrapper.vm.meetingDate).toBe('')
    expect(snapshotDiff(present, next)).toMatchSnapshot()
  })

  it('message is showed after button click and hide on @hideMessage event', async () => {
    const localStore = createStore({
      doReservation: jest.fn()
    })
    const wrapper = factory({ store: localStore, localVue })

    await flushPromises()
    await wrapper.setData({
      predefined: false,
      email: 'test',
      meetingDate: '2020-12-12'
    })
    wrapper.find('.add-meeting__button').trigger('click')
    await flushPromises()

    expect(axios.post).toHaveBeenCalledWith('http://localhost:5679/add', {
      who: 'test',
      date: '2020-12-12'
    })
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.isMessageShowed).toBe(true)
    expect(wrapper.vm.messageClass).toBe('message--success')
    expect(wrapper.vm.messageTitle).toBe('Successfully added a new meeting')
    expect(wrapper.find('.message--success').isVisible()).toBe(true)

    jest.runAllTimers()
    await flushPromises()

    expect(wrapper.vm.isMessageShowed).toBe(false)
    expect(wrapper.find('.message--success').isVisible()).toBe(false)
  })
})
