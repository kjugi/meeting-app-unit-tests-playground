<template>
  <div class="add-meeting">
    <div class="add-meeting__container">
      <h1>Add meeting page</h1>

      <div>
        <p>
          Choose person to meet
        </p>

        <select
          v-if="predefined"
          v-model="selectedPerson"
        >
          <option value="" selected></option>

          <option
            v-for="(option, index) in options"
            :key="index"
          >
            {{ option.text }}
          </option>
        </select>

        <input
          v-else
          v-model="email"
          type="text"
          class="add-meeting__input"
          placeholder="Email address"
        />
      </div>

      <div>
        <label for="predefined">
          Predefined?
        </label>

        <input
          id="predefined"
          v-model="predefined"
          type="checkbox"
          @change="clearField"
        />
      </div>

      <div>
        <label for="start">
          Start date
        </label>

        <input
          type="date"
          id="start"
          v-model="meetingStart"
          :min="getFormattedDate"
        />
      </div>

      <div>
        <label for="all-day">
          All day meeting? (from 9am to 6pm)
        </label>

        <input
          id="all-day"
          v-model="allDay"
          type="checkbox"
          @change="clearField"
        />
      </div>

      <div v-if="!allDay">
        <label for="hour">
          Choose a time for your meeting
        </label>

        <input
          type="time"
          id="hour"
          v-model="selectedHour"
          min="09:00"
          max="18:00"
        />

        <small>
          Office hours are 9am to 6pm
        </small>
      </div>

      <div class="add-meeting__action-wrapper">
        <button
          class="add-meeting__button"
          @click="addMeeting"
        >
          Save meeting
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      predefined: true,
      email: '',
      options: [
        {
          text: 'test',
          value: 'example@o2.pl'
        },
        {
          text: 'Example Person1',
          value: 'meeting1@gmail.com'
        },
        {
          text: 'Example Person2',
          value: 'meeting2@gmail.com'
        }
      ],
      selectedPerson: '',
      meetingStart: '',
      selectedHour: '',
      allDay: true
    }
  },
  computed: {
    getFormattedDate () {
      return new Date().toJSON().slice(0, 10)
    }
  },
  methods: {
    ...mapActions([
      'doReservation'
    ]),
    addMeeting () {
      // TODO: Add axios with asking backend is it ok
      const meetingInfo = {
        date: this.meetingStart
      }

      meetingInfo.who = this.predefined ? this.selectedPerson : this.email
      meetingInfo.hour = this.allDay ? false : this.selectedHour

      this.doReservation(meetingInfo)
      // TODO: clear all fields and show success after doing that
    },
    clearField () {
      // TODO: Clear input or select field after check
    }
  }
}
</script>
