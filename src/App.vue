<template>
  <q-layout view="lHh Lpr lFf" class="relative-position">

    <q-page-container class="absolute fit">
      <router-view></router-view>
    </q-page-container>
  </q-layout>
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
