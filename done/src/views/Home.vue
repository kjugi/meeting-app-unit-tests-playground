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
          {{ item.name }}
        </h2>

        <span class="date">
          {{ item.date }}
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
// @ is an alias to /src

export default {
  name: 'Home',
  computed: {
    ...mapState([
      'meetingList'
    ])
  }
}
</script>

<style scoped>

.home__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.home__item {
  width: 250px;
  padding: 24px;
  margin: 0 8px 8px 8px;
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

.home__footer-link {

}
</style>
