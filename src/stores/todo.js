import {defineStore} from '../pinia/store'
import {ref, computed} from 'vue'
export const useTodosStore = defineStore('todo', ()=>{
    const todos = ref(['1', '2', '3'])

    return {
        todos
    }
})