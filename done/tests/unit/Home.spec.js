import { createWrapper, createStore } from '../factory'
import HomePage from '@/views/Home.vue'

describe('Home page', () => {
  it('meeting list contains elements from store', () => {
    const localStore = createStore({ state: {
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
    }})
    const wrapper = createWrapper(HomePage, { store: localStore })

    expect(wrapper.findAll('.home__item')).toHaveLength(2)
    expect(wrapper).toMatchSnapshot()
  })

  it('render empty list message when don\'t have items', () => {
    const wrapper = createWrapper(HomePage)

    expect(wrapper.find('.home div').text()).toBe('Meeting list is empty!')
  })
})
