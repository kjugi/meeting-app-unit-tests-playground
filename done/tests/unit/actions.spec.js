import { actions } from '@/store'
import axios from 'axios'
import flushPromises from 'flush-promises'

jest.mock('axios')

describe('actions - store', () => {
  beforeEach(() => {
    axios.post.mockClear()
  })

  it('doReservation commits to mutation', () => {
    const context = {
      commit: jest.fn()
    }
    const testItem = { 'test': true }

    actions.doReservation(context, testItem)

    expect(context.commit).toHaveBeenCalledWith('addMeeting', testItem)
  })

  it('fakeApiAction makes commit based on API response', async () => {
    const context = {
      commit: jest.fn()
    }
    const testItem = { 'test': true }

    actions.fakeApiAction(context, testItem)

    await flushPromises()

    expect(axios.post).toHaveBeenCalledWith('http://localhost:5679/fake/confirmMeeting', testItem)
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(context.commit).toHaveBeenCalledWith('fakeCommit', true)

    axios.post.mockImplementationOnce(() => {
      throw 'error'
    })
    actions.fakeApiAction(context)

    expect(axios.post).toHaveBeenCalledTimes(2)
    expect(context.commit).toHaveBeenCalledWith('fakeCommit', false)
  })
})
