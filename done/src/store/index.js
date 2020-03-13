import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    meetingList: []
  },
  mutations: {
    addMeeting (state, data) {
      state.meetingList.push(data)
    }
  },
  actions: {
    passingMeeting (commit, { data }) {
      commit('addMeeting', data)
    }
  }
})
