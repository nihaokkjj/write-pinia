import { getCurrentInstance , inject, reactive, computed, toRefs} from "vue"
import { PiniaSymbol } from "./rootStore"

function createOptionStore(id, options, pinia) {
    const {state, actions, getters={}} = options //store里面的数据, 已定义

    const store = reactive({})//pinia就是创建了一个响应式对象而已
    //需要将这个api转换成组合式
    function setup() {
        pinia.state.value[id] = state ? state() : {}

        let localState = toRefs(pinia.state.value[id])

        return Object.assign(
            localState,
            actions,
            Object.keys(getters).reduce((computeds, getterKey)=>{
                computeds[getterKey] = computed(()=>{
                    return getters[getterKey].call(store)
                })
                return computeds
            }, {})
        )
    }
    //减少代码的重复书写, 此时选项式store已经将数据处理, 剩下的逻辑和处理组合式一致
    createSetupStore(id, setup, pinia)
    return store 
}

//setupStore 用户已经提供了完整的setup方法了, 我们只需执行setup函数即可,
//通过这个返回值, 将其放在store上即可
function createSetupStore(id, setup, pinia) {
    const store = reactive({})

        //处理this指向
    function wrapAction (action) {
        return function () {
            //将action中的this永远处理成store, 保证this指向正确
            return action.call(store, ...arguments)
        }
    }

    const setupStore = setup()
    //拿到的setupStore可能没有处理this指向

    //处理this
    for (let prop in setupStore) {
        const value = setupStore[prop]
        if (typeof value === 'function') {
            setupStore[prop] = wrapAction(value)
        }
    }
    Object.assign(store, setupStore)//加入到队伍里面
    // console.log(store)
    pinia._s.set(id, store)
    return store 
}

export function defineStore(idOrOptions, setup) {
    let id
    let options

    //判断是组合式还是选项式
    const isSetupStore = typeof setup === 'function'

    if(typeof idOrOptions == 'string') {
        id = idOrOptions
        options = setup
    } else { //不是字符串, 说明传入了对象
        options = idOrOptions
        id = idOrOptions.id
    }
    function useStore() {
        const currentInstance = getCurrentInstance()
        const pinia = currentInstance && inject(PiniaSymbol)
        
        if (!pinia._s.has(id)) { //这个store时第一次使用
            
            if(isSetupStore){
                createSetupStore(id, setup, pinia)
                //创建组合式store
            } else {
                createOptionStore(id, options, pinia)
                //创建后的store只需要存到_s中即可
            }
        }
        //如果已经有了store, 不用创建, 直接拿到store就行了
        const store = pinia._s.get(id)

        return store
    }
    return useStore
}