import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

export const createWrapper = (component, options = {}) => {
  const defaultMoutingOptions = {
    localVue,
    store: createStore()
  }

  return mount(component, {
    ...Object.assign(defaultMoutingOptions, options)
  })
}

export const createStore = (options = {}) => {
  // Can add here:
  // State
  // Mutations
  // Actions
  // Getters
  const defaultStoreConfig = {
    state: {
      meetingList: []
    },
    actions: {
      doReservation: jest.fn()
    }
  }

  return new Vuex.Store({ ...Object.assign(defaultStoreConfig, options) })
}
