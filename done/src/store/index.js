import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = {
  meetingList: []
}

export const mutations = {
  addMeeting (state, data) {
    state.meetingList.push(data)
  }
}

export const actions = {
  doReservation ({ commit }, data) {
    commit('addMeeting', data)
  },
  async fakeApiAction ({ commit }, data) {
    try {
      await axios.post('http://localhost:5679/fake/confirmMeeting', { data })
      commit('fakeCommit', true)
    }
    catch (error) {
      commit('fakeCommit', false)
    }
  }
}

// Just for test case purposes
export const getters = {
  getTodayMeetings ( state ) {
    const today = new Date().toJSON().slice(0, 10)
    return state.meetingList.filter(meeting => meeting.date === today)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
