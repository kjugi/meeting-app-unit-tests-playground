import { actions } from '@/store'
import axios from 'axios'
import flushPromises from 'flush-promises'

jest.mock('axios')

describe('store/actions', () => {
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

  it('exampleApiAction makes commit based on API response', async () => {
    const context = {
      commit: jest.fn()
    }
    const testItem = { 'test': true }

    actions.exampleApiAction(context, testItem)

    await flushPromises()

    expect(axios.post).toHaveBeenCalledWith('http://localhost:5679/example/confirmMeeting', testItem)
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(context.commit).toHaveBeenCalledWith('exampleCommit', true)

    axios.post.mockImplementationOnce(() => {
      throw 'error'
    })
    actions.exampleApiAction(context)

    expect(axios.post).toHaveBeenCalledTimes(2)
    expect(context.commit).toHaveBeenCalledWith('exampleCommit', false)
  })
})
