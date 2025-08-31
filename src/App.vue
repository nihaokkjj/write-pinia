<script setup>
import {useCounterStore} from './stores/counter.js'

// import {PiniaSymbol} from './pinia/rootStore.js'
const store = useCounterStore()

const patch = () => {
  // store.$patch({count: 2})
  store.$patch((state) => {
    state.count++
    state.count++
  })
}

const reset = () => {
  store.$reset()
}

//只要状态变化, 就会触发回调
store.$subscribe((mutation, state) => {
  console.log(mutation, state) //存到本地
})

store.$onAction(({after, onError}) => {
  after(() => {
    console.log(store.count)
  })
  onError(err => {
    console.warn(err)
  })
})
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
  <br>
  <button @click="reset">重置</button>
</div>
</template>

<style scoped>

</style>