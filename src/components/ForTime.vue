<template>
  <section class="column">
    <section class="column justify-center">
      <stop-watch
        ref="timer"
        :duration="duration"
        @complete="complete"
      ></stop-watch>
    </section>
    <section class="col-grow">
      {{ wod }}
    </section>
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
    onComplete() {
      this.$emit('complete')
    }
  }
}
</script>