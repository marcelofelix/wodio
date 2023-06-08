export default {
  data() {
    return {
      status: 'stoped'
    }
  },
  computed: {

    isRunning() {
      return this.status === 'running'
    },
    isPaused() {
      return this.status === 'paused'
    },
    isStoped() {
      return this.status === 'stoped'
    },
    isCompleted() {
      return this.status === 'completed'
    },
    isPausedOrStopped() {
      return this.isStoped || this.isPaused
    },
  },
  methods: {
    prepare() {
      this.status = 'preparing'
      this.onPrepare?.call()
    },
    stop() {
      this.status = 'stoped'
      this.onStop?.call()
    },
    start() {
      this.status = 'running'
      this.onStart?.call()
    },
    pause() {
      this.status = 'paused'
      this.onPause?.call()
    },
    complete() {
      this.status = 'completed'
      this.onComplete?.call()
    },
  }
}
