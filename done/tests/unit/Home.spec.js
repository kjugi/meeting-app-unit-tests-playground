import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import HomePage from '@/views/Home.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

const factory = (store) => {
  return mount(HomePage, { store, localVue })
}

const createStore = (state = {}) => {
  return new Vuex.Store({
    state
  })
}

describe('Home page', () => {
  it('meeting list contains elements from store', () => {
    const localStore = createStore({
      meetingList: [
        {
          'date': '2020-03-27',
          'who': 'Example Person1'
        },
        {
          'date': '2020-03-27',
          'who': 'Example Person2'
        }
      ]
    })
    const wrapper = factory(localStore)

    expect(wrapper.findAll('.home__item')).toHaveLength(2)
    expect(wrapper).toMatchSnapshot()
  })

  it('render empty list message when don\'t have items', () => {
    const localStore = createStore({ meetingList: [] })
    const wrapper = factory(localStore)

    expect(wrapper.find('.home div').text()).toBe('Meeting list is empty!')
  })
})
