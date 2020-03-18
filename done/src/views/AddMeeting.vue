<template>
  <div class="add-meeting">
    <div class="add-meeting__container">
      <h1>Add meeting</h1>

      <div class="add-meeting__wrapper">
        <div class="add-meeting__field">
          <label for="email">
            Choose person to meet
          </label>

          <select
            v-if="predefined"
            id="email"
            v-model="selectedPerson"
            class="add-meeting__input"
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
            id="email"
            v-model="email"
            type="text"
            class="add-meeting__input"
            placeholder="Email address"
          />
        </div>

        <div class="add-meeting__field">
          <label for="predefined">
            Predefined?
          </label>

          <input
            id="predefined"
            v-model="predefined"
            type="checkbox"
            @change="clearPersonData"
          />
        </div>
      </div>

      <div class="add-meeting__wrapper">
        <label for="start">
          Start date
        </label>

        <input
          id="start"
          v-model="meetingStart"
          type="date"
          class="add-meeting__input"
          :min="getFormattedDate"
        />
      </div>

      <div class="add-meeting__wrapper">
        <div class="add-meeting__field">
          <label for="all-day">
            All day meeting? (from 9am to 6pm)
          </label>

          <input
            id="all-day"
            v-model="allDay"
            type="checkbox"
          />
        </div>

        <div
          v-if="!allDay"
          class="add-meeting__field"
        >
          <label for="hour">
            Choose a time for your meeting
          </label>

          <input
            id="hour"
            v-model="selectedHour"
            type="time"
            class="add-meeting__input"
            min="09:00"
            max="18:00"
          />

          <small>
            Office hours are 9am to 6pm
          </small>
        </div>
      </div>

      <div class="add-meeting__action-wrapper">
        <button
          class="add-meeting__button"
          @click="addMeeting"
          :disabled="!isFormValid"
        >
          Save meeting
        </button>

        <p
          v-if="!isFormValid"
          class="add-meeting__error"
        >
          You've got a problem in form
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios'

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
    isFormValid () {
      return (
        (this.email.length > 0 || this.selectedPerson.length > 0) &&
        (this.allDay || this.selectedHour.length > 0) &&
        this.meetingStart.length > 0
      ) || false
    },
    showErrorMessage () {
      return this.isFormValid || false
    },
    getFormattedDate () {
      return new Date().toJSON().slice(0, 10)
    }
  },
  methods: {
    ...mapActions([
      'doReservation'
    ]),
    async addMeeting () {
      if (this.isFormValid) {
        try {
          const meetingInfo = {
            date: this.meetingStart
          }

          meetingInfo.who = this.predefined ? this.selectedPerson : this.email
          meetingInfo.hour = this.allDay ? false : this.selectedHour
          meetingInfo.timestamp = new Date(`${this.meetingStart} ${meetingInfo.hour || ''}`).getTime()

          await axios.post('http://localhost:5679/add', {
            meetingInfo
          })

          this.doReservation(meetingInfo)
          // TODO: show success after action
        } catch (e) {
          // TODO: add exception
        } finally {
          this.clearPersonData()
          this.allDay = true
          this.selectedHour = ''
          this.meetingStart = ''
        }
      }
    },
    clearPersonData () {
      this.selectedPerson = ''
      this.email = ''
    }
  }
}
</script>

<style>
.add-meeting__container {
  max-width: 800px;
  margin: 0 auto;
}

.add-meeting__wrapper {
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid;
}

.add-meeting__field {
  margin-bottom: 10px;
}

.add-meeting__field:last-child {
  margin-bottom: 0;
}

.add-meeting__input {
  width: 200px;
  padding: 10px;
  border: 1px solid;
}

small {
  display: block;
}

.add-meeting__button {
  padding: 10px;
  border: 1px solid;
  background-color: #000;
  color: #fff;
  cursor: pointer;
}

.add-meeting__button:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.add-meeting__button:disabled {
  opacity: 0.3;
  cursor: default;
}

.add-meeting__error {
  color: #e04646;
}
</style>
