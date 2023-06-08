<template>
  <section class="row items-center justify-center">
    <section class="text-weight-bolder q-pr-sm">
      Time Cap: 
    </section>
    <section>
      <q-select 
        v-model="duration" 
        :options="options"
        behavior="dialog"
        hide-dropdown-icon
        outlined
        dense
      ></q-select>
    </section>
  </section>
</template>
<script>

export default {
  name: 'TimeCap',
  props: {
    modelValue: { type: Number, default: 5 }
  },
  data() {
    return {
      duration: this.modelValue,
      options: Array.from({length: 59}, (v, i) => i + 1),
    }
  },
  watch: {
    duration(val) {
      this.$emit('update:modelValue', val)
    },
    modelValue(val) {
      this.duration = val
    },
  },
  methods: {
    open() {
      this.active = true
    }
  }
}
</script>