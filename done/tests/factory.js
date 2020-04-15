import { mount } from '@vue/test-utils'
import Vuex from 'vuex'

export const createWrapper = (component, options = {}) => {
  return mount(component, { ...options })
}

export const createStore = (options = {}) => {
  return new Vuex.Store({ ...options })
}
