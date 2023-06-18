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
          <time-cap 
            class="text-h3" 
            v-model="duration"
          ></time-cap>
          {{ duration }}
          <q-input
            v-model="wod"
            type="textarea"
          ></q-input>
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
        <for-time 
          ref="timer"
          :duration="duration"
          :wod="wod"
          @complete="complete"
        ></for-time>    
      </template>
      <template v-slot:completed>
        <section class="column q-gutter-md">
          <section class="text-h1 text-center q-pt-md text-teal-3">
            <q-icon name="workspace_premium" size="200px" color="purple-12"></q-icon>
          </section>
          <q-btn
            color="blue-9"
            size="lg"
            flat
            icon="refresh"
            @click="reset"
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
      duration: 10,
      wod: `666
6 Rounds For Time
6 Front Squat
6 Pull-Ups
6 Branch Presses
6 Deadlifts
6 Barbell Rows
6 Shoulder to Overheads`
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
    reset() {
      this.$refs.timer.reset()
      this.$refs.wod.reset()
    }
  }
}
</script>