<template>
  <div class="home">
    <div
      v-if="meetingList.length > 0"
      class="home__list"
    >
      <div
        v-for="(item, index) in meetingList"
        :key="index"
        :class="[
          'home__item',
          { 'home__item--active': item.isActive },
          { 'home__item--error': item.isError }
        ]"
      >
        <h2>
          {{ item.who }}
        </h2>

        <span class="date">
          {{ item.date }}

          <template v-if="item.hour">
            {{ item.hour }}
          </template>
          <template v-else>
            All day meeting
          </template>
        </span>
      </div>
    </div>
    <div v-else>
      Meeting list is empty!
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapState([
      'meetingList'
    ])
  }
}
</script>

<style>
.home {
  max-width: 800px;
  margin: 0 auto;
}

.home__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.home__item {
  width: 300px;
  padding: 20px;
  margin: 0 10px 10px 10px;
  background: white;
  border: 1px solid;
}

.home__item--active {
  background-color: green;
}

.home__item--error {
  background-color: red;
}

.home__footer {
  position: relative;
  padding: 30px;
  border-top: 1px solid #ddd;
}
</style>
