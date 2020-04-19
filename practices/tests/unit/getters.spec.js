import { getters } from '@/store'
import { advanceTo, clear } from 'jest-date-mock'

describe('getters - store', () => {
  beforeEach(() => {
    advanceTo(new Date('2020-03-27T00:00:05Z'))
  })

  // it('getTodayMeetings returns meetings from today', () => {
  // })

  afterEach(() => {
    clear()
  })
})
