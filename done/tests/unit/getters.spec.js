import { getters } from '@/store'
import { advanceTo, clear } from 'jest-date-mock'

describe('store/getters', () => {
  beforeEach(() => {
    advanceTo(new Date('2020-03-27T00:00:05Z'))
  })

  it('getTodayMeetings returns meetings from today', () => {
    const state = {
      meetingList: [
        {
          'date': '2020-03-27',
          'who': 'Example Person1'
        },
        {
          'date': '2020-03-27',
          'who': 'Example Person2'
        },
        {
          'date': '2020-04-11',
          'who': 'Test meeting'
        },
        {
          'date': '2020-02-10',
          'who': 'guess who'
        }
      ]
    }

    const result = getters.getTodayMeetings(state)

    expect(result).toHaveLength(2)
  })

  afterEach(() => {
    clear()
  })
})
