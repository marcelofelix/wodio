<template>
  <section class="column q-gutter-md">
    <header class="text-h4 text-weight-bolder text-center q-pa-sm">
        {{ title }}
    </header>
    <section v-show="isPreparing" class="column col-grow justify-center">
      <count-down
        ref="timer"
        class="text-h1"
        :duration="countDown"
        @complete="start"
      ></count-down>
    </section>
    <section v-show="isConfiguring" class="column col-grow justify-center">
      <slot name="configure"></slot>
    </section>
    <section v-show="isRunning" class="column col-grow justify-center">
      <slot name="running"></slot>
    </section>
    <section v-show="isCompleted" class="column col-grow justify-center">
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
    reset() {
      this.stage = 'configuring'
      this.$refs.timer.reset()
    }
  }
}
</script>