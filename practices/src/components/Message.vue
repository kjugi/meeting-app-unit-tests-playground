<template>
  <div class="message">
    <h2>
      {{ title }}
    </h2>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    isMessageShowed: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    isMessageShowed (newStatus, oldStatus) {
      const reference = this

      if (newStatus) {
        setTimeout(function () {
          reference.$emit('hideMessage')
        }, 3000)
      }
    }
  }
}
</script>

<style>
.message {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid;
  background-color: #fff;
}

.message--success {
  background-color: #3fbc34;
}

.message--error {
  background-color: #ff5353;
}
</style>
