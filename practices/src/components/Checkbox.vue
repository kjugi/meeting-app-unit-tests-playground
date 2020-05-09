<template>
  <div class="checkbox">
    <label :for="id">
      {{ label }}
    </label>

    <input
      :id="id"
      v-model="localValue"
      v-bind="$attrs"
      type="checkbox"
    />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    value: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    localValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
        this.$emit('change')
      }
    }
  }
}
</script>

<style>
.checkbox {
  margin-bottom: 10px;
}
</style>
