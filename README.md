# unit-tests-playground

## 2 views of booking app without calendar:

1. View with all booked meetings
2. API in other directory with express with responsing true/false on request
3. Second view to book meeting:
    - input for email or select with list of people to meet with toggle checkbox
    - setting date of meeting with hours
    - checkbox for full day meeting
    - save button
4. Saving button adds meeting after backend response to booked meetings view
5. Add unit tests in CI

## Unit tests to write:

1. Message component
    - renders prop title when passed
    - emit event when isMessageShowed updates
2. Checkbox component
    - emit events when input on checkbox
3. Home view
    - meeting list contains elements from store
    - render empty list message when don\'t have items
4. Add Meeting view
    - default form is rendered
    - has loading class when form is blocked
    - predefined addreses are available
    - predefined select change value to selected option
    - predefined checkbox toggle fields and clear values
    - can set custom meeting day in form
    - min attribute in input date has today date
    - error is showed when form is invalid
    - button can be disable or enabled
    - can add meeting to store
    - message is showed after button click and hide on @hideMessage event

Other topics which are not ready yet and don't have more time to present
5. Snapshot testing
6. Testing vuex store actions and mutations
