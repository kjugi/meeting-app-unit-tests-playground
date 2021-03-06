import { createWrapper, createStore } from '../factory'
import HomePage from '@/views/Home.vue'

describe('views/Home.vue', () => {
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

    expect(wrapper.findAll('[data-testid="meetingItem"]')).toHaveLength(2)
    expect(wrapper).toMatchSnapshot()
  })

  it('render empty list message when don\'t have items', () => {
    const wrapper = createWrapper(HomePage)

    expect(wrapper.find('[data-testid="emptyMessage"]').text())
      .toBe('Meeting list is empty!')
  })
})
