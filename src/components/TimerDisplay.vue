<template>
  <section class="row justify-center">
    <section>
      <span v-if="hours > 0">{{ hours }}</span>
      <span v-if="hours > 0" class="label q-pr-sm">h</span>
      <span v-if="minutes > 0">{{ minutes }}</span>
      <span v-if="minutes > 0" class="label q-pr-sm">m</span>
      <span>{{ seconds }}</span>
      <span class="label">s</span>
    </section>
  </section>
</template>
<script>
import moment from 'moment'
export default {
  name: 'TimerDisplay',
  props: {
    value: { type: Number, default: 0 }
  },
  computed: {
    format() {
      let value = ''
      if (this.value > 3600) { value = 'HH:' }
      if (this.value > 59) { value += 'mm:' }
      return value += 'ss'
    },
    duration() {
      return moment.duration({ seconds: this.value })
    },
    seconds() {
      return this.duration.seconds()
    },
    minutes() {
      return this.duration.minutes()
    },
    hours() {
      return this.duration.hours()
    }
  }
}
</script>
<style scoped>
  .label {
    font-size: 0.3em;
  }
</style>