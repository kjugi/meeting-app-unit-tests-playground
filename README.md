# unit-tests-playground

## 2 view booking app without calendar:

1. View with all booked meetings
2. API in other directory with express with responsing true/false on request
3. Second view to book meeting:
    - input for email or select with list of people to meet with toggle checkbox
    - setting date of meeting with hours
    - checkbox for full day meeting
    - save button
4. Saving button adds meeting after backend response to booked meetings view

## Unit tests to write:

TODO
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
    - predefined select emit @input when change value
    - predefined checkbox emit @input, toggle fields and clear values
    - can set custom meeting start in form
    - min attribute in input date has today date
    - all day checkbox toggle input on field and clear selectedHour
    - can select custom hour value in form
    - error is showed when form is invalid
    - button can be disable or enabled
    - button emit event with @addEvent
    - message is showed after button click and hide on @hideMessage event
    - can add meeting to store
5. Snapshot testing
6. Testing vuex store actions and mutations