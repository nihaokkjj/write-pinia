import {defineStore} from '../pinia/store.js'
import {ref, computed} from 'vue'
// export const useCounterStore = defineStore('counter', ()=>{
//     const count = ref(0)

//     const double = computed(()=>{
//         return count.value * 2
//     })

//     const increment = (num)=>{
//         count.value += num
//     }

//     return {
//         count,
//         double,
//         increment
//     }
// })
export const useCounterStore = defineStore('counter', {
    state: () => {
        return {count: 0}
    },
    getters: {
        double() {
            return this.count * 2
        }
    },
    actions: {
        increment(num) {
            this.count += num
        }
    }
})

//optionStore 基于optionAPI来实现, 使用方法和vuex一致