import { isReactive, toRaw, toRef, isRef} from 'vue'
export {createPinia} from './createStore'
export {defineStore} from './store'

//方法同toRefs, toRefs基于toRef来实现的，只是storeToRefs会移除掉对函数的处理
export function storeToRefs(store) {
    store = toRaw(store)
    console.log(store)

    const result = {}

    for (let key in store) {
        let value = store[key]
        if(isRef(value) || isReactive(value)) {
            result[key] = toRef(store, key)
        }
    }
    return result
}