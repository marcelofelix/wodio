<template>
  <section class="fit q-pa-md">
    <section class="fit">
      <router-view></router-view>
    </section>
  </section>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'LayoutDefault',


  setup () {
    return {
      leftDrawerOpen: ref(false)
    }
  }
}
</script>
