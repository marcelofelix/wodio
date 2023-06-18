<template>
  <section class="q-pa-sm timer">
    <section class="text-center text-blue-3" @click="toggle">
      {{ value }}
    </section>
  </section>
</template>
<script>
import TimerEvent from '@/mixins/TimerEvent'

export default {
  name: 'CountDown',
  mixins: [TimerEvent],
  props: {
    duration: { type: Number, default: 10 },
  },
  data() {
    return {
      value: this.duration,
      interval: null,
    }
  },
  watch: {
    duration(val) {
      this.value = val
    }
  },
  methods: {
    dec() {
      this.value -= 1
      if (this.value === 0) {
        this.$emit('complete')
        this.value = this.duration
        clearInterval(this.interval)
        this.interval = null
      }
    },
    start() {
      if (!this.interval) {
        this.interval = setInterval(() => {
          this.dec()
        }, 1000)
      }
    },
    reset() {
      this.interval = null
      this.value = this.duration
    }
  }
}
</script>