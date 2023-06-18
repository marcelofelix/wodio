<template>
  <section class="column">
    <timer-display 
      :value="value"
      class="timer text-center text-h1 text-blue-3"
      @click="toggle"
    >
    </timer-display>
    <q-linear-progress
      :value="progress"
      :animation-speed="100"
      size="lg"
      color="blue-3"
    ></q-linear-progress>
  </section>
</template>
<script>
import TimerDisplay from './TimerDisplay.vue'

export default {
  name: 'StopWatch',
  components: { TimerDisplay },
  props: {
    duration: { type: Number, default: 0 },
  },
  data() {
    return {
      running: false,
      interval: null,
      value: 0
    }
  },
  computed: {
    progress() {
      return this.value / this.duration
    }
  },
  methods: {
    toggle() {
      this.running ? this.pause() : this.start()
    },
    add() {
      if (this.value < this.duration) this.value += 1
      if (this.value >= this.duration) this.complete()
    },
    subtract() {
      this.value -= 1
    },
    stop() {
      this.pause()
      this.timer = 0
    },
    complete() {
      this.pause()
      this.$emit('complete')
    },
    reset() {
      this.interval = null
      this.value = 0
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