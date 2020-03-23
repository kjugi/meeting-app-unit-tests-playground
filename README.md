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
5. Add unit tests in CI

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
    - default form is rendered (143ms)
    - has loading class when form is blocked (15ms)
    - predefined addreses are available (19ms)
    - predefined select change value to selected option (19ms)
    - predefined checkbox toggle fields and clear values (29ms)
    - can set custom meeting start in form (11ms)
    - min attribute in input date has today date (13ms)
    - all day checkbox toggle input on field and clear selectedHour (22ms)
    - error is showed when form is invalid (61ms)
    - button can be disable or enabled (115ms)
    - can add meeting to store (21ms)
    - message is showed after button click and hide on @hideMessage event
5. Snapshot testing
6. Testing vuex store actions and mutations
