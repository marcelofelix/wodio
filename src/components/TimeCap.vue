<template>
  <section class="flex q-gutter-sm items-end">
    <section class="text-weight-bolder">
      Time Cap: 
    </section>
    <section tabindex="0" class="cap flex justify-end " @keydown="keydow">
      <div
        v-for="(v, i) in value" :key="i"
        class="digit" :class="{'selected': focus == i }"
      > 
        {{ v }}
      </div>
    </section>
  </section>
</template>
<script>

import moment from 'moment'
import { chunk } from 'lodash'

export default {
  name: 'TimeCap',
  props: {
    modelValue: { type: Number, default: 5 }
  },
  data() {
    return {
      focus: this.parse(this.modelValue).length - 1,
      value: this.parse(this.modelValue)
    }
  },
  watch: {
    value(val) {
      const values = chunk(val.split('').reverse(), 2)
      const seconds = (parseInt((values[0] || []).reverse().join('')) || 0)
      const minutes = (parseInt((values[1] || []).reverse().join('')) || 0) * 60
      const hours = (parseInt((values[2] || []).reverse().join('')) || 0) * 60 * 60
      this.$emit('update:modelValue', seconds + minutes + hours)
    }
  },
  computed: {
    left() {
      return this.value.slice(0, this.focus + 1)
    },
    right() {
      return this.value.slice(this.focus + 1)
    }
  },
  methods: {
    parse(val) {
      const time = moment.duration({ seconds: val })
      return parseInt(moment.utc(time.asMilliseconds()).format("HHmmss")).toString()
    },
    open() {
      this.active = true
    },
    keyup(event, value, index) {
      console.log(event)
      this.values[index].value = event.key
    },
    moveLeft() {
      if (this.focus > 0) this.focus -= 1
    },
    moveRight() {
      const size = this.value.length - 1
      if (this.focus < size) this.focus += 1
    },
    add(letter) {
      const left = this.value.slice(0, this.focus + 1)
      const right = this.value.slice(this.focus + 1)
      let value = left + letter + right
      if (value.length > 6) {
        value = value.slice(1)
      }
      this.value = value
      if (value.length <= 6) {
        this.moveRight()
      }
    },
    remove() {
      const left = this.value.slice(0, this.focus)
      const right = this.value.slice(this.focus + 1)
      let value = left + right
      if (value.length > 6) {
        value = value.slice(1)
      }
      this.value = value
      if (value.length < 6) {
        this.moveLeft()
      }
    },
    keydow(e) {
      switch(e.key) {
        case 'ArrowLeft':
          this.moveLeft()
          break
        case 'ArrowRight':
          this.moveRight()
          break
        case 'Backspace':
          this.remove()
          break
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          this.add(e.key)
      }
    }
  }
}
</script>
<style scoped lang="scss">
  .cap {
    min-width: 5.5em;
    outline: auto;
    font-size: 1em;
    padding: 4px 8px;
    line-height: 1.2;
    height: calc(1em * 1.2 + 8px);
    .digit {
      &:nth-last-child(5) {
        margin-right: 0.5em;
        &:after {
          content: 'h';
          font-size: 0.5em;
        }
      }
      &:nth-last-child(3) {
        margin-right: 0.5em;
        &:after {
          content: 'm';
          font-size: 0.5em;
        }
      }
      &:last-child {
        &:after {
          content: 's';
          font-size: 0.5em;
        }
      }
    }
  }
  .selected {
    border-style: solid;
    border-width: 0px;
    border-right-width: 1px;
  }
</style>