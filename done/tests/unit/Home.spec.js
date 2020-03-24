import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import HomePage from '@/views/Home.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Home page', () => {
  it('meeting list contains elements from store', () => {
    const state = {
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
    }

    const store = new Vuex.Store({
      state
    })

    const wrapper = mount(HomePage, { store, localVue })

    expect(wrapper.findAll('.home__item')).toHaveLength(2)
  })

  it('render empty list message when don\'t have items', () => {
    const store = new Vuex.Store({
      state: {
        meetingList: []
      }
    })

    const wrapper = mount(HomePage, { store, localVue })

    expect(wrapper.find('.home div').text()).toBe('Meeting list is empty!')
  })
})
