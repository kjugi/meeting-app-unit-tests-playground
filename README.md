# unit-tests-playground

## Requirements

```
$ node -v
v12.16
```

## Where we have code - project structure

`api/` - directory with our backend and 2 simple endpoints for app

`done/` - directory with ready to run app and all unit tests as an examples

`practices/` - directory with ready to run add but without any test cases finished

## Start app locally

Each directory has own `package.json` file which contains informations about scripts. Hoever here is a list to start API from `api/` directory and app from `done/` directory:

First CLI tab:
```
cd api && yarn && yarn start
```

Second CLI tab:
```
cd done && yarn && yarn serve
```

After that API should be available on `http://localhost:5679`
And app should be available on `http://localhost:8080`

## Run tests

From `done/` directory
```
yarn test:unit
```

Same command is in `/practices` directory

To run single test file from `done/` directory:
```
jest path/to/test/file.spec.js
```

Real example:
```
jest tests/unit/Home.spec.js
```

## Overview of 2 routes booking app:

1. Homepage view with all booked meetings
2. Simple API in other directory on express
3. Second view to book meeting:
    - input for email or select with list of people to meet with toggle checkbox
    - selecting date of meeting
    - save button
4. Saving button adds meeting after backend response to booked meetings view

## Unit tests to write:

1. Message component
    - renders prop title when passed
    - emit event when isMessageShowed updates
    - default component matches snapshot
2. Checkbox component
    - emit events when change checked value
    - default component matches snapshot
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
5. Actions
    - doReservation commits to mutation
    - exampleApiAction makes commit based on API response
6. Mutations
    - addMeeting push item to state.meetingList
7. Getters
    - getTodayMeetings returns meetings from today


## Covered topics and good practices in this repo:
- Basic tests
- Mocking functions (axios)
- Testing mocked API responses
- Mocking vuex store
- Timer mocks
- Factory functions
- Emitt events testing
- async testing syntax
- Testing vuex actions, mutations and getters
- Both side component testing
- Snapshot testing
- Acceptance testing and snapthot-diff checking
- Using data-testid in components and tests
- Using husky to run Githooks for unit tests

## Extra topic, not recommended in big stores:
- Testing Vuex store instance

## What about Vuex modules?
It's the same approach as importing actions from single module Vuex store. You are just importing actions from store module and i.e. testing in separate file for each store module

```
storeModuleA.js
storeModuleB.js
```

```
storeModuleAActions.spec.js
storeModuleAGetters.spec.js
storeModuleBActions.spec.js
...
```

## Found a bug or repo needs update? - contribute

If you found some problem with API or meeting app please create an issue or PR with changes

## Have a problem?

Open an issue or search in existing ones

## License

Over MIT License
