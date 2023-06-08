<template>
  <section class="column q-gutter-sm">
    <section class="timer text-center text-h2 text-blue-3" @click="toggle">
      {{ display }}
    </section>
    <section class="text-center text-h7 text-white" @click="toggle">
      Time cap: {{ displayTarget }}
    </section>
    <q-linear-progress
      :value="progress"
      :animation-speed="100"
      size="lg"
      color="blue-3"
    ></q-linear-progress>
  </section>
</template>
<script>
import moment from 'moment'

export default {
  name: 'StopWatch',
  props: {
    duration: { type: Number, default: 0 },
  },
  data() {
    return {
      running: false,
      unit: 'second',
      interval: null,
      timer: moment.duration(),
    }
  },
  computed: {
    format() {
      let value = ''
      if (this.duration > 3600) { value = 'HH:' }
      if (this.duration > 59) { value += 'mm:' }
      return value += 'ss'
    },
    display() {
      return moment.utc(this.timer.asMilliseconds()).format(this.format)
    },
    target() {
      return moment.duration({seconds: this.duration})
    },
    displayTarget() {
      return  moment.utc(this.target.asMilliseconds()).format(this.format)
    },
    progress() {
      return this.timer.asMilliseconds() / this.target.asMilliseconds()
    }
  },
  methods: {
    toggle() {
      this.running ? this.pause() : this.start()
    },
    add() {
      this.timer.add(1, this.unit)
      // this.beep.play()
      if (this.timer.asMilliseconds() >= this.target.asMilliseconds()) {
        this.complete()
      }
    },
    subtract() {
      this.timer.subtract(1, this.unit)
    },
    stop() {
      this.pause()
      this.timer = moment.duration()
    },
    complete() {
      this.pause()
      this.$emit('complete')
    },
    start() {
      if (!this.interval) {
        this.running = true
        this.interval = setInterval(() => {
          this.add()
        }, 1000)
      }
    },
    pause() {
      this.running = false
      clearInterval(this.interval)
      this.interval = null
    }
  }
}
</script>