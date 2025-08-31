import { PiniaSymbol } from "./rootStore"
import {ref} from 'vue'

export function createPinia () {
    //pinia是管理多个state状态的
    const state = ref({})

    const _p = [] //插件
    const pinia = {
        install(app) {
            app.config.globalProperties.$pinia = pinia
            app.provide(PiniaSymbol, pinia)
        },
        use(plugin) {
            _p.push(plugin)
            return pinia
        },
        state,
        _s:new Map(),
        _p
    }
    return pinia
}