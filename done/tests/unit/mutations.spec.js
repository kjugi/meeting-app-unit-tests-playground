import { mutations } from '@/store'

describe('mutations', () => {
  it('addMeeting pushing item to state.meetingList', () => {
    const newElement = {
      'date': '2020-03-27',
      'who': 'Example Person1'
    }
    const state = {
      meetingList: []
    }

    mutations.addMeeting(state, newElement)

    expect(state.meetingList).toStrictEqual([newElement])
  })
})
