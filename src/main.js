import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from './pinia/createStore'

const app = createApp(App)
const pinia = createPinia()

//use API可以去调用插件的install方法，将app注入进来
app.use(pinia) //使用pinia插件

app.mount('#app')