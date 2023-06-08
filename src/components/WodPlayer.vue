<template>
  <section class="column q-gutter-md">
    <header class="text-h4 text-weight-bolder text-center q-pa-sm">
        {{ title }}
    </header>
    <count-down
      v-show="isPreparing"
      ref="timer"
      :duration="countDown"
      @complete="start"
    ></count-down>
    <section v-show="isConfiguring">
      <slot name="configure"></slot>
    </section>
    <section v-show="isRunning">
      <slot name="running"></slot>
    </section>
    <section v-show="isCompleted">
      <slot name="completed">
      </slot>
    </section>
  </section>
</template>
<script>
import CountDown from './CountDown.vue'
export default {
  name: 'WodPlayer',
  components: { CountDown },
  props: {
    title: { type: String, required: true },
    countDown: { type: Number, default: 10 }
  },
  data() {
    return {
      stage: 'configuring'
    }
  },
  computed: {
    isConfiguring() {
      return this.stage === 'configuring'
    },
    isPreparing() {
      return this.stage === 'preparing'
    },
    isRunning() {
      return this.stage === 'running'
    },
    isCompleted() {
      return this.stage === 'completed'
    }
  },
  methods: {
    prepare() {
      this.stage = 'preparing'
      this.$refs.timer.start()
    },
    start() {
      this.stage = 'running'
      this.$emit('start')
    },
    complete() {
      this.stage = 'completed'
    },
    restart() {
      this.stage = 'configuring'
      this.$refs.timer.stop()
      this.$emit('restart')
    }
  }
}
</script>