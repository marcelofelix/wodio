<template>
  <section class="full-height">
    <wod-player
      ref="wod"
      class="full-height "
      title="For Time"
      @start="start"
    >
      <header 
        class="text-h4 text-weight-bolder text-center"
      >
        FOR TIME
      </header>
      <template v-slot:configure>
        <section class="column q-gutter-md">
          <time-cap v-model="duration"></time-cap>
          <q-btn
            color="blue-9"
            size="lg"
            flat
            icon="play_circle_outline"
            @click="startWod"
          ></q-btn>
        </section>
      </template>
      <template v-slot:running>
        <section class="column q-gutter-md">
          <for-time 
            ref="timer"
            :duration="duration"
            @complete="complete"
          ></for-time>    
          <q-btn
            color="blue-9"
            size="lg"
            flat
            icon="pause"
            @click="pause"
          ></q-btn>
        </section>
      </template>
      <template v-slot:completed>
        <section class="column q-gutter-md">
          <section class="text-h1 text-center q-pt-md text-teal-3">
            Parabens!
          </section>
          <q-btn
            color="blue-9"
            size="lg"
            flat
            icon="refresh"
            @click="restart"
          ></q-btn>
        </section>
      </template>
    </wod-player>
  </section>
</template>
<script>
import ForTime from "@/components/ForTime.vue"
import TimeCap from "@/components/TimeCap.vue"
import TimerEvent from '@/mixins/TimerEvent'
import WodPlayer from '@/components/WodPlayer.vue'
export default {
  components: { ForTime, WodPlayer, TimeCap },
  mixins: [TimerEvent],
  data() {
    return {
      duration: 10
    }
  },
  methods: {
    startWod() {
      this.$refs.wod.prepare()
    },
    onStart() {
      this.$refs.timer.start()
    },
    onPause() {
      this.$refs.timer.pause()
    },
    onComplete() {
      this.$refs.wod.complete()
    },
    restart() {
      this.$refs.wod.restart()
    }
  }
}
</script>