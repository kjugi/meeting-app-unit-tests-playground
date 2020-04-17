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
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
