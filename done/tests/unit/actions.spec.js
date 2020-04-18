import { actions } from '@/store'

describe('actions - store', () => {
  it('doReservation commits to mutation', () => {
    const context = {
      commit: jest.fn()
    }
    const testItem = { 'test': true }

    actions.doReservation(context, testItem)

    expect(context.commit).toHaveBeenCalledWith('addMeeting', testItem)
  })

  // TODO: Add action with mocked request to API
})
