import { PiniaSymbol } from "./rootStore"
import {ref} from 'vue'

export function createPinia () {
    
    const state = ref({})

    const pinia = {
        install(app) {
            app.config.globalProperties.$pinia = pinia
            app.provide(PiniaSymbol, pinia)
        },
        state,
        _s:new Map()
    }
    return pinia
}