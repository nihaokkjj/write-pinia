<script setup>
import {useCounterStore} from './stores/counter.js'
import {toRefs} from 'vue'
// import {PiniaSymbol} from './pinia/rootStore.js'
const store = useCounterStore()

const patch = () => {
  store.$patch({count: 2})
// store.$patch((state) => {
//   state.count++
//   state.count++
// })
}
</script>

<template>
<div>
  计数器: {{ store.count }}
  <br>
  <button @click="store.increment(9)">{{store.count}}</button>
  <div>double
    {{ store.double }}
  </div>
  <button @click="patch">同时多次修改</button>
</div>
</template>

<style scoped>

</style>