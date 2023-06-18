<template>
  <section class="column">
    <section class="column justify-center">
      <stop-watch
        ref="timer"
        :duration="duration"
        @complete="complete"
      ></stop-watch>
    </section>
    <pre class="col-grow q-pa-lg text-body2">
      {{ wod }}
    </pre>
  </section>
</template>
<script>
import StopWatch from '@/components/StopWatch.vue'
import TimerEvent from '@/mixins/TimerEvent'
export default {
  name: 'ForTime',
  components: { StopWatch },
  mixins: [TimerEvent],
  props: {
    duration: { type: Number, default: 5 },
    wod: { type: String, default: "" }
  },
  methods: {
    onStop() {
      this.$refs.timer.stop()
    },
    onStart() {
      this.$refs.timer.start()
    },
    onPause() {
      this.$refs.timer.pause()
    },
    reset() {
      this.$refs.timer.reset()
    },
    onComplete() {
      this.$emit('complete')
    }
  }
}
</script>