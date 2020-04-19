import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import axios from 'axios'
import flushPromises from 'flush-promises'

const localVue = createLocalVue()
localVue.use(Vuex)

jest.mock('axios')

describe('vuex store instance', () => {
  let store
  let storeConfig

  beforeEach(() => {
    storeConfig = {
      state: { meetingList: [] },
      mutations: {
        addMeeting (state, data) {
          state.meetingList.push(data)
        },
        fakeCommit () {
          return true
        }
      },
      actions: {
        doReservation ({ commit }, data) {
          commit('addMeeting', data)
        },
        async fakeApiAction ({ commit }, data) {
          try {
            await axios.post('http://localhost:5679/fake/confirmMeeting', data)
            commit('fakeCommit', true)
          }
          catch (error) {
            commit('fakeCommit', false)
          }
        }
      },
      getters: {
        getTodayMeetings ( state ) {
          const today = '2020-01-01'
          return state.meetingList.filter(meeting => meeting.date === today)
        }
      }
    }

    store = new Vuex.Store(storeConfig)

    axios.post.mockClear()
  })

  it('commit addMeeting updates state of meetingList', () => {
    const testElement = { 'test': true }

    store.commit('addMeeting', testElement)

    expect(store.state.meetingList).toStrictEqual([testElement])

    store.commit('addMeeting', testElement)

    expect(store.state.meetingList).toStrictEqual([testElement, testElement])
  })

  it('dispatching fakeApiAction doing mocked request', async () => {
    const testItem = { 'test': true }

    store.dispatch('fakeApiAction', testItem)

    await flushPromises()

    expect(axios.post).toHaveBeenCalledWith('http://localhost:5679/fake/confirmMeeting', testItem)
    expect(axios.post).toHaveBeenCalledTimes(1)

    axios.post.mockImplementationOnce(() => {
      throw 'error'
    })
    store.dispatch('fakeApiAction', testItem)

    expect(axios.post).toHaveBeenCalledTimes(2)
  })

  it('dispatching doReservation with today meeting updates getter getTodayMeetings', () => {
    const testItem = { 'date': '2020-01-01' }

    store.dispatch('doReservation', testItem)

    expect(store.state.meetingList).toHaveLength(1)
    expect(store.getters.getTodayMeetings).toHaveLength(1)
    expect(store.getters.getTodayMeetings).toEqual([testItem])

    store.dispatch('doReservation', testItem)
    store.dispatch('doReservation', { 'date': '2000-01-01' })

    expect(store.state.meetingList).toHaveLength(3)
    expect(store.getters.getTodayMeetings).toHaveLength(2)
    expect(store.getters.getTodayMeetings).toEqual([ testItem, testItem ])
  })
})
