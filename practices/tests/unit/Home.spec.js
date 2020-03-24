import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import HomePage from '@/views/Home.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Home page', () => {
  // it('meeting list contains elements from store', () => {
  // })

  // it('render empty list message when don\'t have items', () => {
  // })
})
