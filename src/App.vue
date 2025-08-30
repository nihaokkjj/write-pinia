<script setup>
import {useCounterStore} from './stores/counter.js'
import {toRefs} from 'vue'
// import {PiniaSymbol} from './pinia/rootStore.js'
const store = useCounterStore()
const {count, increment} = toRefs(store)

</script>

<template>
<div>
  计数器: {{ count }}
  <br>
  <button @click="increment(9)">{{count}}</button>
  <div>double
    {{ store.double }}
  </div>
</div>
</template>

<style scoped>

</style>