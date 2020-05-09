import snapshotDiff from 'snapshot-diff'
import axios from 'axios'
import { advanceTo, clear } from 'jest-date-mock'
// Check for more: https://github.com/kentor/flush-promises
// or if you don't want to add external lib: https://github.com/kentor/flush-promises/blob/master/index.js
import flushPromises from 'flush-promises'
import { createWrapper, createStore } from '../factory'
import AddMeeting from '@/views/AddMeeting.vue'

// Check for more: https://jestjs.io/docs/en/mock-functions.html
// Alternative for mocking requests: https://github.com/ctimmerm/axios-mock-adapter
jest.mock('axios')
// Check for more: https://jestjs.io/docs/en/timer-mocks
jest.useFakeTimers()

describe('views/AddMeeting.vue', () => {
  let present
  let next

  beforeEach(() => {
    // Mocking computed is possible but not recommended and it's better to mock JS method
    advanceTo(new Date('2000-01-01T00:00:05Z'))

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
    const wrapper = createWrapper(AddMeeting)

    expect(wrapper.classes()).toStrictEqual([
      'add-meeting',
      'add-meeting--loading'
    ])
    expect(wrapper.find('[data-testid="emailInput"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="predefinedCheckbox"]').exists())
      .toBe(true)
    expect(wrapper.findComponent({ ref: 'meetingDate' }).exists()).toBe(true)
    expect(wrapper.find('[data-testid="addMeetingButton"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="generalErrorMessage"]').exists())
      .toBe(true)
    expect(wrapper).toMatchSnapshot()
  })

  it('has loading class when form is blocked', async () => {
    const wrapper = createWrapper(AddMeeting)

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
    const wrapper = createWrapper(AddMeeting)
    present = wrapper.html()

    expect(wrapper.vm.options).toBeNull()
    expect(present).toMatchSnapshot()

    await flushPromises()
    next = wrapper.html()

    expect(axios.get).toHaveBeenCalledWith('http://localhost:5679/users')
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.isMessageShowed).toBe(false)
    expect(wrapper.vm.messageTitle).toBe('')
    expect(wrapper.vm.options.length).toBe(3)
    expect(
      wrapper.findAll(
        '[data-testid="emailInput"] [data-testid="predefinedEmailOption"]'
      ).length
    ).toBe(4)
    expect(snapshotDiff(present, next)).toMatchSnapshot()
  })

  it('predefined select change value to selected option', async () => {
    const wrapper = createWrapper(AddMeeting)
    await flushPromises()
    present = wrapper.html()

    expect(wrapper.vm.selectedPerson).toBe('')
    expect(present).toMatchSnapshot()

    wrapper.findAll(
      '[data-testid="emailInput"] [data-testid="predefinedEmailOption"'
    ).at(2).setSelected()
    next = wrapper.html()

    expect(wrapper.vm.selectedPerson).toBe('Example Person1')
    expect(snapshotDiff(present, next)).toMatchSnapshot()
  })

  it('predefined checkbox toggle fields and clear values', async () => {
    const wrapper = createWrapper(AddMeeting)
    await flushPromises()
    present = wrapper.html()

    expect(wrapper.vm.predefined).toBe(true)
    expect(present).toMatchSnapshot()

    await wrapper.find('[data-testid="predefinedCheckbox"]').setChecked(false)
    next = wrapper.html()

    expect(wrapper.vm.predefined).toBe(false)
    expect(snapshotDiff(present, next)).toMatchSnapshot()

    present = next
    wrapper.find('[data-testid="emailInput"]').setValue('example value')
    next = wrapper.html()

    expect(wrapper.vm.email).toBe('example value')
    expect(snapshotDiff(present, next)).toMatchSnapshot()

    present = next
    await wrapper.find('[data-testid="predefinedCheckbox"]').setChecked(true)
    next = wrapper.html()

    expect(wrapper.vm.email).toBe('')
    expect(wrapper.find('[data-testid="emailInput"]').exists()).toBe(true)
    expect(snapshotDiff(present, next)).toMatchSnapshot()
  })

  it('can set custom meeting day in form', async () => {
    const wrapper = createWrapper(AddMeeting)
    const todayDateFormat = new Date().toJSON().slice(0, 10)
    await flushPromises()
    present = wrapper.html()

    expect(wrapper.vm.meetingDate).toBe('')
    expect(present).toMatchSnapshot()

    wrapper.find('[data-testid="meetingDateInput"]').setValue(todayDateFormat)
    next = wrapper.html()

    expect(wrapper.find('[data-testid="meetingDateInput"]').element.value)
      .toBe(todayDateFormat)
    expect(wrapper.vm.meetingDate).toBe(todayDateFormat)
    expect(snapshotDiff(present, next)).toMatchSnapshot()
  })

  it('min attribute in input date has today date', async () => {
    const wrapper = createWrapper(AddMeeting)
    const todayDateFormat = new Date().toJSON().slice(0, 10)
    await flushPromises()

    expect(wrapper.find('[data-testid="meetingDateInput"]').attributes().min)
      .toBe(todayDateFormat)
  })

  it('error is showed when form is invalid', async () => {
    const wrapper = createWrapper(AddMeeting)
    present = wrapper.html()

    expect(wrapper.vm.isFormValid).toBe(false)
    expect(wrapper.find('[data-testid="generalErrorMessage"]').exists())
      .toBe(true)
    expect(present).toMatchSnapshot()

    await wrapper.setData({
      email: 'test',
      meetingDate: '2020-12-12'
    })
    next = wrapper.html()

    expect(wrapper.vm.isFormValid).toBe(true)
    expect(wrapper.find('[data-testid="generalErrorMessage"]').exists())
      .toBe(false)
    expect(snapshotDiff(present, next)).toMatchSnapshot()
  })

  it('button can be disable or enabled', async () => {
    const wrapper = createWrapper(AddMeeting)
    await flushPromises()
    present = wrapper.html()

    expect(wrapper.vm.isFormValid).toBe(false)
    expect(wrapper.vm.isFormBlocked).toBe(false)
    expect(wrapper.find('[data-testid="addMeetingButton"]').attributes().disabled)
      .toBe('disabled')
    expect(present).toMatchSnapshot()

    await wrapper.setData({
      email: 'test',
      meetingDate: '2020-12-12'
    })
    next = wrapper.html()

    expect(wrapper.vm.isFormValid).toBe(true)
    expect(wrapper.find('[data-testid="addMeetingButton"]').attributes().disabled)
      .toBeUndefined()
    expect(snapshotDiff(present, next)).toMatchSnapshot()
  })

  it('can add meeting to store', async () => {
    const actions = {
      doReservation: jest.fn()
    }
    const localStore = createStore({ actions })
    const wrapper = createWrapper(AddMeeting, { store: localStore })
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

    wrapper.find('[data-testid="addMeetingButton"]').trigger('click')

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
    const wrapper = createWrapper(AddMeeting)

    await flushPromises()
    await wrapper.setData({
      predefined: false,
      email: 'test',
      meetingDate: '2020-12-12'
    })
    wrapper.find('[data-testid="addMeetingButton"]').trigger('click')
    await flushPromises()

    expect(axios.post).toHaveBeenCalledWith('http://localhost:5679/add', {
      who: 'test',
      date: '2020-12-12'
    })
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.isMessageShowed).toBe(true)
    expect(wrapper.vm.messageClass).toBe('message--success')
    expect(wrapper.vm.messageTitle).toBe('Successfully added a new meeting')
    expect(wrapper.find('.message--success').element).toBeVisible()

    jest.runAllTimers()
    await flushPromises()

    expect(wrapper.vm.isMessageShowed).toBe(false)
    expect(wrapper.find('.message--success').element).not.toBeVisible()
  })

  afterEach(() => {
    // Clering data mock after test
    clear()
  })
})
