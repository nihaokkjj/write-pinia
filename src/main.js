import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from './pinia/createStore'

const app = createApp(App)
const pinia = createPinia()

function persitisPlugin() { //为了用户传递参数, 所以用函数
    return ({store, id}) => { //所有的store都会执行此方法

        let oldState = JSON.parse(localStorage.getItem(id) || '{}')
        
        store.$state = oldState
        // store.$patch(oldState) //将老状态进行替换
        store.$subscribe((mutation, state) => {
            localStorage.setItem(id, JSON.stringify(state))
        })
    }
}
pinia.use(persitisPlugin())

//use API可以去调用插件的install方法，将app注入进来
app.use(pinia) //使用pinia插件

app.mount('#app')